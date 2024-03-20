import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class ChangeCostumeAction extends Action<void>{
	private costumeName: Action<string>
	constructor(costumeName: Action<string>){
		super()
		this.costumeName = costumeName
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const costume = await this.costumeName.execute(stepper, object, puzzle)
			console.log(`Changing costume to ${costume} is going!`)
			// puzzle.commands.
			stepper.registerInstruction(Instruction.changeCostume(object.id, costume))
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.costumeName.wakeup()
		this.exitHybernation()
	}
}