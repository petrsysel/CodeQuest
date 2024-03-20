import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class SetLayerAction extends Action<void>{
	private layer: Action<number>
	constructor(layer: Action<number>){
		super()
		this.layer = layer
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const resolvedLayer = await this.layer.execute(stepper, object, puzzle)
			console.log(`Seting layer of an object!`)
			puzzle.commands.setLayer(object.id, resolvedLayer)
			stepper.registerInstruction(Instruction.setLayer(object.id, resolvedLayer))
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.layer.wakeup()
		this.exitHybernation()
	}
}