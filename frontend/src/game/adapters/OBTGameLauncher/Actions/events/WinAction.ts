import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class WinAction extends Action<void>{
	message: Action<string>

	constructor(message: Action<string>){
		super()
		this.message = message
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		const messageValue = await this.message.execute(stepper, object, puzzle)
		return new Promise((resolve, reject) => {
			console.log("WIN!")
			stepper.registerInstruction(Instruction.win(object.id, messageValue))
			stepper.on('step', () => {
				resolve()
			})
			stepper.set()
		})
	}
	wakeup(): void {
		this.message.wakeup()
		this.exitHybernation()
	}
}