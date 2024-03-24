import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class ChangeVariableAction extends Action<void>{
	private variableName: string
	private increment: Action<any>
	constructor(variableName: string, increment: Action<any>){
		super()
		this.variableName = variableName
		this.increment = increment
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const increment = await this.increment.execute(stepper, object, puzzle, sharedData)
			
			sharedData.changeVariable(object.id, this.variableName, increment)
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}