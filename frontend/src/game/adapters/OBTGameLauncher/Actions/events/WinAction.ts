import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class WinAction extends Action<void>{
	message: Action<string>

	constructor(message: Action<string>){
		super()
		this.message = message
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		const messageValue = await this.message.execute(stepper, object, puzzle, sharedData)
		return new Promise((resolve, reject) => {
			
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