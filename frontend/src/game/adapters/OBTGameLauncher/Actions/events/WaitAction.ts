import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle";
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes";
import { Instruction } from "../../../GameInstructions/GameInstructions";
import { SharedData } from "../../SharedData";
import { Stepper } from "../../Stepper";
import { Action } from "../Action";

export class WaitAction extends Action<void>{
	type: "instant" | "delayed";
	private delay: Action<number>
	private countdown: number | undefined

	constructor(delay: Action<number>){
		super()
		this.type = 'delayed'
		this.delay = delay
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			stepper.on('step', async () => {
				stepper.registerInstruction(Instruction.wait(object.id, 1))
				resolve()
				this.hybernate()
			})
			stepper.set()
		})
	}

	wakeup(): void {
		this.delay.wakeup()
		this.exitHybernation()
	}
}