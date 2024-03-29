import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action, ActionList } from "../Action"

export class ForAction extends Action<void>{
	private predicate: Action<boolean | number>
	private body: ActionList<any>

	constructor(predicate: Action<boolean|number>, body: ActionList<any>){
		super()
		this.predicate = predicate
		this.body = body
	}
	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		let predicateValue = await this.predicate.execute(stepper, object, puzzle, sharedData)
		
		if(typeof predicateValue === 'boolean'){
			
			predicateValue = await this.predicate.execute(stepper, object, puzzle, sharedData)
			
			while(predicateValue = await this.predicate.execute(stepper, object, puzzle, sharedData)){
				
				await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object, puzzle, sharedData)), Promise.resolve())
				
			}
			this.hybernate()
		}
		else{
			for (let i = 0; i < (predicateValue as number); i++) {
				// await Promise.all(this.body.map(a => a.execute()))
				await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object, puzzle, sharedData)), Promise.resolve())
				this.hybernate()
			}
		}
	}
	wakeup(): void {
		this.body.forEach(a => a.wakeup())
		this.exitHybernation()
	}
}