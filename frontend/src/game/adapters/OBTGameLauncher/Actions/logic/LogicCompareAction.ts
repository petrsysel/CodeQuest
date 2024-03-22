import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

type LogicCompareOperation = "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE"
export class LogicCompareAction extends Action<boolean>{
	private operation: LogicCompareOperation
	private operandA: Action<any>
	private operandB: Action<any>

	constructor(operation: LogicCompareOperation, operandA: Action<any>, operandB: Action<any>){
		super()
		this.operation = operation
		this.operandA = operandA
		this.operandB = operandB
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			let valueA = await this.operandA.execute(stepper, object, puzzle, sharedData)
			let valueB = await this.operandB.execute(stepper, object, puzzle, sharedData)

			let result: boolean
			if(this.operation === "EQ"){
				result = valueA == valueB
			}
			else if(this.operation === "NEQ"){
				result = valueA != valueB
			}
			else if(this.operation === "LT"){
				result = valueA < valueB
			}
			else if(this.operation === "LTE"){
				result = valueA <= valueB
			}
			else if(this.operation === "GT"){
				result = valueA > valueB
			}
			else{
				result = valueA >= valueB
			}

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}