import { PuzzleObject } from "../../../../shared/puzzle-lib/core/PuzzleTypes"
import { GameInstruction } from "../../GameInstructions/GameInstructions"
import { SingleSignal } from "../SingleSignal"
import { Stepper } from "../Stepper"

export type ActionType = "instant" | "delayed"
export type ActionEvent = 'hybernation' | 'ready' | 'event-call' | 'register-instruction'
export type ActionData = {
	eventName?: string,
	gameInstruction?: GameInstruction
}
export type ActionList<T> = Action<T>[]

export abstract class Action<T>{
	private hybernation: boolean = false
	private signal: SingleSignal<ActionEvent, null>

	constructor(){
		this.signal = new SingleSignal()
	}

	protected exitHybernation(){
		this.hybernation = false
	}

	protected hybernate(){
		this.hybernation = true
		this.emit('hybernation')
	}
	isHybernating(){
		return this.hybernation
	}
	execute(stepper: Stepper, object: PuzzleObject): Promise<T>{
		return new Promise((resolve, reject) => {
			reject("Action not yet implemented.")
		})
	}
	on(event: ActionEvent, callback: () => void){
		this.signal.on(event, callback)
	}
	emit(event: ActionEvent){
		this.signal.emit(event, null)
	}
	wakeup(){
		throw new Error('Wakeup method not implemented.')
	}
}