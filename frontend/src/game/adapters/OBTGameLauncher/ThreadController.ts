import { Puzzle } from "../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../shared/puzzle-lib/core/PuzzleTypes"
import { GameInstruction } from "../GameInstructions/GameInstructions"
import { Action, ActionData, ActionEvent } from "./Actions/Action"
import { ActionContainer } from "./Actions/ActionContainer"
import { RuleCheckAction } from "./Actions/events/RuleCheckAction"
import { ObjectResponse } from "./ObjectController"
import { SharedData } from "./SharedData"
import { SingleSignal } from "./SingleSignal"
import { Stepper } from "./Stepper"

export type ThreadType = 'main' | 'event' | 'function'
		
export class ThreadController{
	private stepper: Stepper
	name: string|Action<string>
	body: ActionContainer
	object: PuzzleObject
	type: ThreadType
	private puzzle: Puzzle
	private sharedData: SharedData
	private ruleCheck: RuleCheckAction | undefined

	signal: SingleSignal<ActionEvent, ActionData>

	hasBeenExecuted: boolean = false
	hasBeenCalledNext: boolean = false
	wasCalledDelayedAction: boolean = false
	resolvedName: string = "unresolved"

	constructor(type: ThreadType, name: string|Action<string>, object: PuzzleObject, body: ActionContainer, puzzle: Puzzle, sharedData: SharedData, ruleCheck: RuleCheckAction | undefined){
		this.puzzle = puzzle
		this.sharedData = sharedData
		this.signal = new SingleSignal()
		this.stepper = new Stepper()
		if(!(typeof(name) == 'string')) name.execute(this.stepper, object, puzzle, sharedData).then(result => {
			this.resolvedName = result
		})
		else this.resolvedName = name
		this.name = name
		this.body = body
		this.object = object
		this.type = type
		this.ruleCheck = ruleCheck

		body.on('hybernation', () => {
			this.signal.emit('hybernation', {})
		})

		this.stepper.on('setted', () => {
			this.wasCalledDelayedAction = true
			this.signal.emit('ready', {})
		})
		this.stepper.on('event-call', data => {
			this.signal.emit('event-call',{
				eventName: data.eventName
			})
		})
		this.stepper.on('register-instruction', data => {
			this.signal.emit('register-instruction', {
				gameInstruction: data.gameInstruction
			})
		})
	}

	on(event: ActionEvent, callback: (data: ActionData) => void){
		this.signal.on(event, callback)
	}

	checkRules(): Promise<ObjectResponse>{
		return new Promise(async (resolve, reject) => {
			const eventCalls: string[] = []
			const instructions: GameInstruction[] = []
			const customStepper = new Stepper()
			customStepper.on('event-call', data => {
				eventCalls.push(data.eventName!)
			})
			customStepper.on('register-instruction', data => {
				instructions.push(data.gameInstruction!)
			})
			customStepper.on('setted', () => {
				customStepper.next()
			})
			if(this.ruleCheck) {
				await this.ruleCheck.execute(customStepper, this.object, this.puzzle, this.sharedData)
				resolve({
					eventCalls: eventCalls,
					instructions: instructions,
					state: "ready"
				})
			}
			else resolve({
				eventCalls: [],
				instructions: [],
				state: "ready"
			})
		})
	}

	next(){
		
		if(!this.hasBeenExecuted){
			this.body.execute(this.stepper, this.object, this.puzzle, this.sharedData)
			this.hasBeenExecuted = true
		}
		else{
			this.stepper.next()
		}
		
	}
	firstNext(){
		this.hasBeenCalledNext = true
		this.stepper.next()
	}
	reload(){
		this.hasBeenCalledNext = false
		this.hasBeenExecuted = false
		this.wasCalledDelayedAction = false
		this.body.wakeup()
	}
}