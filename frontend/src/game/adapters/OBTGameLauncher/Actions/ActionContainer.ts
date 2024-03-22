import { Puzzle } from "../../../../shared/puzzle-lib/core/Puzzle";
import { PuzzleObject } from "../../../../shared/puzzle-lib/core/PuzzleTypes";
import { SharedData } from "../SharedData";
import { Stepper } from "../Stepper";
import { Action } from "./Action";

export class ActionContainer extends Action<void>{
	type: "instant" | "delayed";
	private body: Action<any>[]
	constructor(...body:Action<any>[]){
		super()
		this.type = 'instant'
		this.body = body
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		await this.body.reduce((p, a) => 
			p.then(() => {
				return a.execute(stepper, object, puzzle, sharedData)
			}
		), Promise.resolve())
		this.hybernate()
	}

	wakeup(): void {
		this.body.forEach(a => a.wakeup())
		this.exitHybernation()
	}
}