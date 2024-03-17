import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class NumberAction extends Action<number>{
	private num: number
	constructor(num: number){
		super()
		this.num = num
	}
	execute(stepper: Stepper, object: PuzzleObject): Promise<number> {
		return new Promise((resolve, reject) => {
			resolve(this.num)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}