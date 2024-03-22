import { Signal } from "easybox"
import { ThreadController } from "./ThreadController"
import { ThreadStack } from "./ThreadStack"
import { PuzzleObject } from "../../../shared/puzzle-lib/core/PuzzleTypes"
import { GameInstruction } from "../GameInstructions/GameInstructions"
import { Stepper } from "./Stepper"
import { ActionContainer } from "./Actions/ActionContainer"
import { OnEventAction } from "./Actions/events/OnEventAction"
import { Puzzle } from "../../../shared/puzzle-lib/core/Puzzle"
import { SharedData } from "./SharedData"
import { RuleCheckAction } from "./Actions/events/RuleCheckAction"

export type ObjectControllerEvent = 'hybernation' | 'ready' | 'event-call'

export type ObjectResponse = {
	state: 'hybernation' | 'ready',
	eventCalls: string[],
	instructions: GameInstruction[]
}

export class ObjectController{
	mainThread: ThreadController
	eventThreads: ThreadController[]

	threadStack: ThreadStack
	private signal: Signal<ObjectControllerEvent, null | {eventName: string}>
	private object: PuzzleObject
	private puzzle: Puzzle
	private sharedData: SharedData
	private ruleChecks: RuleCheckAction[]

	constructor(object: PuzzleObject, main: ActionContainer, eventHandlers: OnEventAction[], puzzle: Puzzle, sharedData: SharedData, ruleChecks: RuleCheckAction[]){
		this.signal = new Signal()
		this.puzzle = puzzle
		this.sharedData = sharedData
		this.object = object
		const ruleCheck = ruleChecks.length > 0 ? ruleChecks[0] : undefined
		this.mainThread = new ThreadController('main', 'main', object, main, puzzle, sharedData, ruleCheck)
		this.eventThreads = eventHandlers.map(eh => new ThreadController('event', eh.eventName, object, eh.actionBody, puzzle, sharedData, ruleCheck))
		this.threadStack = new ThreadStack()
		this.ruleChecks = ruleChecks
		
		this.run()
	}

	on(event: ObjectControllerEvent, callback: (eventName: null | {eventName: string}) => void){
		this.signal.on(event, callback)
	}

	run(){
		this.threadStack.add(this.mainThread)
		this.mainThread.next()
		console.log("Running main thread of an object " + this.object.settings.name)
	}
	async call(eventName: string): Promise<boolean>{
		return new Promise(async (resolve, reject) => {
			function checkHasEvent(t: ThreadController){
				let comparationPredicate = false
				if(typeof(t.name) === 'string'){
					comparationPredicate = t.name === eventName
				}
				else{
					const stepper = new Stepper()
					const resolvedEventName = t.resolvedName
					comparationPredicate = resolvedEventName === eventName
				}
				return comparationPredicate
			}

			const thread = this.eventThreads.find(t => checkHasEvent(t))
			if(!thread) resolve(false)
			// this.threadStack.clearEvents()
			else{
				thread.reload()
				this.threadStack.add(thread)
				// this.threadStack.read()?.run()
				resolve(true)
			}
		})
	}
	next(callings?: string[]): Promise<ObjectResponse>{
		const instructions: GameInstruction[] = []
		return new Promise(async (resolve, reject) => {
			if(callings){
				
				let callingTry = false
				for (let i = 0; i < callings.length; i++) {
					if(!callingTry){
						callingTry = await this.call(callings[i])
					}
					
				}
			}

			const prepareRound = (initEventCalls: string[]) => {
				const activeThread = this.threadStack.read()

				if(activeThread){
					if(activeThread.body.isHybernating()) resolve({
						state: 'hybernation',
						eventCalls: initEventCalls,
						instructions: instructions
					})
					else{
						const eventCalls: string[] = [...initEventCalls]
					
					
						activeThread.on('event-call', data => {
							eventCalls.push(data?.eventName!)
						})
						activeThread.on('register-instruction', data => {
							instructions.push(data.gameInstruction!)
						})
						activeThread.on('hybernation', async () => {
							const ruleCheckRound = await activeThread.checkRules()
							console.log(ruleCheckRound)
							const wasCalledDelayedAction = this.threadStack.read()?.wasCalledDelayedAction
							this.threadStack.pop()
							
							if(this.threadStack.read()){
								if(!wasCalledDelayedAction){
									prepareRound([...eventCalls, ...ruleCheckRound.eventCalls])
								}
								else resolve({
									state: 'ready',
									eventCalls: [...eventCalls, ...ruleCheckRound.eventCalls],
									instructions: [...instructions, ...ruleCheckRound.instructions]
								})
							}
							else{
								resolve({
									state: 'hybernation',
									eventCalls: [...eventCalls, ...ruleCheckRound.eventCalls],
									instructions: [...instructions, ...ruleCheckRound.instructions]
								})
							}
							
						})
						activeThread.on('ready', async () => {
							const ruleCheckRound = await activeThread.checkRules()
							console.log(ruleCheckRound)
							if(activeThread.hasBeenCalledNext){
								resolve({
									state: 'ready',
									eventCalls: [...eventCalls, ...ruleCheckRound.eventCalls],
									instructions: [...instructions, ...ruleCheckRound.instructions]
								})
							}
							else{
								activeThread.firstNext()
							}
						})

						activeThread.next()
					}

					
				}
				else {
					resolve({
						state: 'hybernation',
						eventCalls: initEventCalls,
						instructions: instructions
					})
				}
			}
			prepareRound([])
		})
	}
}