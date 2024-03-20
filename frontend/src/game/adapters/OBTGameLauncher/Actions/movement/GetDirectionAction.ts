import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class GetDirectionAction extends Action<string>{

	constructor(){
		super()
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<string> {
		return new Promise(async (resolve, reject) => {
			console.log(`Get direction request!`)
			const direction = puzzle.commands.getDirection(object.id)
			resolve(direction)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}