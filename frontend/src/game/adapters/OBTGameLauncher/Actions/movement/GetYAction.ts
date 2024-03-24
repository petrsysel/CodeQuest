import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class GetYAction extends Action<number>{

	constructor(){
		super()
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<number> {
		return new Promise(async (resolve, reject) => {
			const x = puzzle.commands.getY(object.id)
			resolve(x)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}