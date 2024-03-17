import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class TextAction extends Action<string>{
	private text: string
	constructor(text: string){
		super()
		this.text = text
	}
	execute(stepper: Stepper, object: PuzzleObject): Promise<string> {
		return new Promise((resolve, reject) => {
			resolve(this.text)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}