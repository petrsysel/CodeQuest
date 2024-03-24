import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action, ActionList } from "../Action"

export class ReturnFunctionAction extends Action<void>{
	private condition: Action<boolean>
	private value: Action<any> | undefined
	private functionName: string

	constructor(functionName: string, condition: Action<boolean>, value: Action<any> | undefined){
		super()
		this.functionName = functionName
		this.condition = condition
		this.value = value
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		const resolvedCondition = await this.condition.execute(stepper, object, puzzle, sharedData)
		
		const valueToReturn = this.value? await this.value.execute(stepper, object, puzzle, sharedData) : null
		
		if(resolvedCondition){
			const func = sharedData.getFunction(object.id, this.functionName)!.emit("returned")
			sharedData.returnFuntion(object.id, this.functionName, valueToReturn)
		}
		this.hybernate()
	}
	wakeup(): void {
		this.condition.wakeup()
		this.exitHybernation()
	}
}