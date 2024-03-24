import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class EmitAction extends Action<void>{
	text: Action<string>

	constructor(text: Action<string>){
		super()
		this.text = text
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		const eventName = await this.text.execute(stepper, object, puzzle, sharedData)
		return new Promise((resolve, reject) => {
			stepper.emit(eventName)
			resolve()
		})
	}
	wakeup(): void {
		this.text.wakeup()
		this.exitHybernation()
	}
}