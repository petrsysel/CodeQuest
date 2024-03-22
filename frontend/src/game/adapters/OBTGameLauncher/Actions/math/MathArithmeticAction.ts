import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

type ArithmeticOperation = "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER"
export class MathArithmeticAction extends Action<number>{
	private operation: ArithmeticOperation
	private operandA: Action<number>
	private operandB: Action<number>

	constructor(operation: ArithmeticOperation, operandA: Action<number>, operandB: Action<number>){
		super()
		this.operation = operation
		this.operandA = operandA
		this.operandB = operandB
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<number> {
		return new Promise(async (resolve, reject) => {
			let valueA = await this.operandA.execute(stepper, object, puzzle, sharedData)
			let valueB = await this.operandB.execute(stepper, object, puzzle, sharedData)

			let result: number
			if(this.operation === "ADD"){
				result = valueA + valueB
			}
			else if(this.operation === "MINUS"){
				result = valueA - valueB
			}
			else if(this.operation === "MULTIPLY"){
				result = valueA * valueB
			}
			else if(this.operation === "DIVIDE"){
				result = valueA / valueB
			}
			else{
				result = Math.pow(valueA, valueB)
			}

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}