import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class MathModuloAction extends Action<number>{
	private divident: Action<number>
	private divisor: Action<number>

	constructor(divident: Action<number>, divisor: Action<number>){
		super()
		this.divident = divident
		this.divisor = divisor
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<number> {
		return new Promise(async (resolve, reject) => {
			let dividentValue = await this.divident.execute(stepper, object, puzzle)
			let divisorValue = await this.divisor.execute(stepper, object, puzzle)

			let result = dividentValue % divisorValue

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}