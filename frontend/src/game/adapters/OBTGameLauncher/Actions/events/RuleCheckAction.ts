import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"
import { ActionContainer } from "../ActionContainer"

export class RuleCheckAction extends Action<void>{
	body: ActionContainer

	public get actionBody(){
		return this.body
	}

	constructor(body: Action<any>[]){
		super()
		this.body = new ActionContainer(...body)
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			await this.body.execute(stepper, object, puzzle, sharedData)
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.body.wakeup()
		this.exitHybernation()
	}
}