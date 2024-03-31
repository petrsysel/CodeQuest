import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Instruction } from "../../../GameInstructions/GameInstructions"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"
import { GoAction } from "./GoActions"

export class GoByAction extends Action<void>{
	private steps: Action<number>
	constructor(steps: Action<number>){
		super()
		this.steps = steps
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			const stepsValue = await this.steps.execute(stepper, object, puzzle, sharedData)
			const stepActions = new Array<number>(stepsValue).fill(0).map(init => new GoAction())
			for(const step of stepActions){
				await step.execute(stepper, object, puzzle)
			}
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}