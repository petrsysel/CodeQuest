import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class GoAction extends Action<void>{
	constructor(){
		super()

	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		return new Promise((resolve, reject) => {
			stepper.on('step', () => {
				console.log(`${object.settings.name} is going!`)
				stepper.registerInstruction(Instruction.goForward(object.id))
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