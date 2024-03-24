import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class DirectionPickAction extends Action<string>{
	private direction: string
	constructor(direction: string){
		super()
		this.direction = direction
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<string> {
		return new Promise(async (resolve, reject) => {
			resolve(this.direction)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}