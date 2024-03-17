import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"
import { ActionContainer } from "../ActionContainer"

export class OnEventAction extends Action<void>{
	eventName: Action<string>
	body: ActionContainer

	public get actionBody(){
		return this.body
	}

	constructor(text: Action<string>, ...body: Action<any>[]){
		super()
		this.eventName = text
		this.body = new ActionContainer(...body)
	}

	async execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
		const eventName = await this.eventName.execute(stepper, object)
		return new Promise(async (resolve, reject) => {
			await this.body.execute(stepper, object)
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.eventName.wakeup()
		this.body.wakeup()
		this.exitHybernation()
	}
}