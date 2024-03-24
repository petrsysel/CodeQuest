import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class JumpToAction extends Action<void>{
	private x: Action<number>
	private y: Action<number>
	constructor(x: Action<number>, y: Action<number>){
		super()
		this.x = x
		this.y = y
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const posX = await this.x.execute(stepper, object, puzzle, sharedData)
			const posY = await this.y.execute(stepper, object, puzzle, sharedData)
			puzzle.commands.jumpTo(object.id, posX, posY)
			stepper.registerInstruction(Instruction.jumpTo(object.id, posX, posY))
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}