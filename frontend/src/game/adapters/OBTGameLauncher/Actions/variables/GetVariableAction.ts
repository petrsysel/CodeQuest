import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class GetVariableAction extends Action<any>{
	private variableName: string
	constructor(variableName: string){
		super()
		this.variableName = variableName
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<any> {
		return new Promise(async (resolve, reject) => {
			
			const variable = sharedData.getVariable(object.id, this.variableName)
			console.log(variable)
			console.log(`${object.settings.name} is getting variable: ${variable}.`)
			resolve(variable)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}