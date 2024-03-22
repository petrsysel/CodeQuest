import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action, ActionList } from "../Action"

type VariableInfo = {
	id: string,
	name: string
}
export class CallMethodAction extends Action<void>{
	private name: string
	private variables: VariableInfo[]
	private args: Action<any>[]

	constructor(name: string, variables: VariableInfo[], args: Action<any>[]){
		super()
		this.name = name
		this.variables = variables
		this.args = args
	}

	getName(){
		return this.name
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		const functionAction = sharedData.getFunction(object.id, this.name)?.action
		if(functionAction){
			for(const v of this.variables){
				const i = this.variables.indexOf(v)
				const value = await this.args[i].execute(stepper, object, puzzle, sharedData)
				sharedData.setVariable(object.id, v.id, value)
			}

			functionAction.wakeup()
			await functionAction.execute(stepper, object, puzzle, sharedData)
		}
		this.hybernate()
	}
	wakeup(): void {
		this.exitHybernation()
	}
}