import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class SetDirectionAction extends Action<void>{
	private direction: Action<string>
	constructor(direction: Action<string>){
		super()
		this.direction = direction
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const dir = await this.direction.execute(stepper, object, puzzle, sharedData) as "up" | "right" | "left" | "down"
			puzzle.commands.setDirection(object.id, dir)
			stepper.registerInstruction(Instruction.setDirection(object.id, dir))
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}