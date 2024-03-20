import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class MathConstrainAction extends Action<number>{
	private value: Action<number>
	private low: Action<number>
	private high: Action<number>

	constructor(value: Action<number>, low: Action<number>, high: Action<number>){
		super()
		this.value = value
		this.low = low
		this.high = high
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<number> {
		return new Promise(async (resolve, reject) => {
			let val = await this.value.execute(stepper, object, puzzle)
			let lowValue = await this.low.execute(stepper, object, puzzle)
			let highValue = await this.high.execute(stepper, object, puzzle)

			let result: number

			if(val < lowValue) result = lowValue
			else if(val > highValue) result = highValue
			else result = val

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}