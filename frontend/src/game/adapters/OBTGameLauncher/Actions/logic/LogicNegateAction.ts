import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

type LogicOperation = "AND" | "OR"
export class LogicNegateAction extends Action<boolean>{
	private expression: Action<boolean>

	constructor(expression: Action<boolean>){
		super()
		this.expression = expression
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			let value = await this.expression.execute(stepper, object, puzzle, sharedData)
			resolve(!value)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}