import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class TextIsEmptyAction extends Action<boolean>{
	private text: Action<string>
	constructor(text: Action<string>){
		super()
		this.text = text
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			const value = await this.text.execute(stepper, object, puzzle, sharedData)
			resolve(value.length === 0)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}