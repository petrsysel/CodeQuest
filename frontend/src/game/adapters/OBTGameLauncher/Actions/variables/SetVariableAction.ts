import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class SetVariableAction extends Action<void>{
	private variableName: string
	private value: Action<any>
	constructor(variableName: string, value: Action<any>){
		super()
		this.variableName = variableName
		this.value = value
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const value = await this.value.execute(stepper, object, puzzle, sharedData)

			sharedData.setVariable(object.id, this.variableName, value)
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}