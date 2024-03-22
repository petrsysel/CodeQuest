import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class IsTouchingAction extends Action<boolean>{
	private targetName: Action<string>

	constructor(targetName: Action<string>){
		super()
		this.targetName = targetName
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			const target = await this.targetName.execute(stepper, object, puzzle, sharedData)

			const isTouch = puzzle.commands.isTouch(object.id, target)
			console.log(`Check touch: ${isTouch}`)
			resolve(isTouch)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}