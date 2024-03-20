import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

type MathRoundOperation = "ROUND" | "ROUNDUP" | "ROUNDDOWN"
export class MathRoundAction extends Action<number>{
	private operation: MathRoundOperation
	private numberToRound: Action<number>

	constructor(operation: MathRoundOperation, numberToRound: Action<number>){
		super()
		this.operation = operation
		this.numberToRound = numberToRound
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<number> {
		return new Promise(async (resolve, reject) => {
			let value = await this.numberToRound.execute(stepper, object, puzzle)
			
			let result: number
			if(this.operation === "ROUND"){
				result = Math.round(value)
			}
			else if(this.operation === "ROUNDDOWN"){
				result = Math.floor(value)
			}
			else{
				result = Math.ceil(value)
			}

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}