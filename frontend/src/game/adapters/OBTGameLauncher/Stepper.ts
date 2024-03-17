import { GameInstruction } from "../GameInstructions/GameInstructions"
import { ActionData } from "./Actions/Action"
import { SingleSignal } from "./SingleSignal"

export type StepperEvent = 'step' | 'setted' | 'event-call' | 'register-instruction'
export class Stepper{
	private signal: SingleSignal<StepperEvent, ActionData>

	constructor(){
		this.signal = new SingleSignal()
	}
	on(event: StepperEvent, callback: (data: ActionData) => void){
		this.signal.on(event, callback)
	}
	emit(eventName: string){
		this.signal.emit('event-call', {
			eventName: eventName
		})
	}
	next(){
		this.signal.emit('step', {})
	}
	set(){
		this.signal.emit('setted', {})
	}
	registerInstruction(instruction: GameInstruction){
		this.signal.emit('register-instruction', {
			gameInstruction: instruction
		})
	}
}