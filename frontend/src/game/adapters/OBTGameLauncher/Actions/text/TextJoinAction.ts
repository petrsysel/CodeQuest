import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class TextJoinAction extends Action<string>{
	private strings: Action<string>[]
	constructor(strings: Action<string>[]){
		super()
		this.strings = strings
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<string> {
		return new Promise(async (resolve, reject) => {
			let acc: string = ""
			for(const str of this.strings){
				const resolved = await str.execute(stepper, object, puzzle, sharedData)
				console.log(resolved)
				acc += resolved
			}
			console.log(`Resolved joined text: ${acc}`)
			resolve(acc)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}