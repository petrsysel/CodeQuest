import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class TextLengthAction extends Action<number>{
	private text: Action<string>
	constructor(text: Action<string>){
		super()
		this.text = text
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<number> {
		return new Promise(async (resolve, reject) => {
			const value = await this.text.execute(stepper, object, puzzle, sharedData)
			resolve(value.length)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}