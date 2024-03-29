import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle";
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes";
import { Instruction } from "../../../GameInstructions/GameInstructions";
import { SharedData } from "../../SharedData";
import { Stepper } from "../../Stepper";
import { Action } from "../Action";
import { WaitAction } from "./WaitAction";

export class MultiWaitAction extends Action<void>{
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
			const roundAmount = await this.delay.execute(stepper, object,puzzle, sharedData)
			const waitList = new Array<string>(roundAmount).fill("").map(init => new WaitAction(this.delay))
			for(const wait of waitList){
				await wait.execute(stepper, object, puzzle, sharedData)
			}
			this.hybernate()
			resolve()
		})
	}

	wakeup(): void {
		this.delay.wakeup()
		this.exitHybernation()
	}
}