import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class TurnAction extends Action<void>{
	private side: "right" | "left"
	constructor(side: "right" | "left"){
		super()
		this.side = side
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		return new Promise((resolve, reject) => {
			stepper.on('step', () => {
				console.log(`${object.settings.name} is turning!`)
				puzzle.commands.turn(object.id,this.side)
				stepper.registerInstruction(Instruction.turn(object.id, this.side))
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