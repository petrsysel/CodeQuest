import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class ShowAction extends Action<void>{
	
	constructor(){
		super()
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		return new Promise(async (resolve, reject) => {
			console.log(`Object is showing up!`)
			puzzle.commands.show(object.id)
			stepper.registerInstruction(Instruction.show(object.id))
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}