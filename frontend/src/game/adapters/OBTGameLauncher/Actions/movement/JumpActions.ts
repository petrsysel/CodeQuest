import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class JumpAction extends Action<void>{
	constructor(){
		super()
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		return new Promise((resolve, reject) => {
			stepper.on('step', () => {
				puzzle.commands.jump(object.id)
				stepper.registerInstruction(Instruction.jump(object.id))
				resolve()
				this.hybernate()
			})
			stepper.set()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}