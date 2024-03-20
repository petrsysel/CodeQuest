import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class BooleanAction extends Action<boolean>{
	private value: boolean
	constructor(value: boolean){
		super()
		this.value = value
	}
	execute(stepper: Stepper, object: PuzzleObject): Promise<boolean> {
		return new Promise((resolve, reject) => {
			resolve(this.value)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}