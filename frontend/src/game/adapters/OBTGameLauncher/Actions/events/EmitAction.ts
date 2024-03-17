import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class EmitAction extends Action<void>{
	text: Action<string>

	constructor(text: Action<string>){
		super()
		this.text = text
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		const eventName = await this.text.execute(stepper, object, puzzle)
		return new Promise((resolve, reject) => {
			console.log("Event " + eventName + " were been emitted!")
			stepper.emit(eventName)
			resolve()
		})
	}
	wakeup(): void {
		this.text.wakeup()
		this.exitHybernation()
	}
}