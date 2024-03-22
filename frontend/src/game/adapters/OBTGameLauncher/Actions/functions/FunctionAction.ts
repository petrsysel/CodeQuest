import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action, ActionList } from "../Action"

export class FunctionAction extends Action<void>{
	private body: ActionList<any>
	private name: string
	private returnValue: Action<any> | undefined

	constructor(name: string, body: ActionList<any>, returnValue: Action<any> | undefined){
		super()
		this.name = name
		this.body = body
		this.returnValue = returnValue
	}

	getName(){
		return this.name
	}

	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		return new Promise(async (resolve, reject) => {
			sharedData.getFunction(object.id, this.name)!.on('returned', () => {
				resolve()
				return
			})

			for(const a of this.body){
				await a.execute(stepper, object, puzzle, sharedData)
			}

			const valueToReturn = this.returnValue? await this.returnValue.execute(stepper, object, puzzle, sharedData): null
			sharedData.returnFuntion(object.id, this.name, valueToReturn)
			resolve()
			this.hybernate()
		})
	}
	wakeup(): void {
		this.body.forEach(a => a.wakeup())
		this.exitHybernation()
	}
}