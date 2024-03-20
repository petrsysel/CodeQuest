import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class DistanceToAction extends Action<number>{
	private targetName: Action<string>

	constructor(targetName: Action<string>){
		super()
		this.targetName = targetName
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<number> {
		return new Promise(async (resolve, reject) => {
			const target = await this.targetName.execute(stepper, object, puzzle)

			const distance = puzzle.commands.distanceTo(object.id, target)
			resolve(distance)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}