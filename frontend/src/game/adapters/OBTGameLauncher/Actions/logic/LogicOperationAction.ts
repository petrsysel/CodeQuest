import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

type LogicOperation = "AND" | "OR"
export class LogicOperationAction extends Action<boolean>{
	private operation: LogicOperation
	private operandA: Action<boolean>
	private operandB: Action<boolean>

	constructor(operation: LogicOperation, operandA: Action<any>, operandB: Action<any>){
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
			if(this.operation === "AND"){
				result = valueA && valueB
			}
			else{
				result = valueA || valueB
			}

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}