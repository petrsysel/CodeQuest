import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
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
	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<void> {
		let predicateValue = await this.predicate.execute(stepper, object, puzzle)
		console.log("predicate value")
		console.log(predicateValue)
		console.log(typeof predicateValue)
		if(typeof predicateValue === 'boolean'){
			
			predicateValue = await this.predicate.execute(stepper, object, puzzle)
			
			console.log('init predicate')
			console.log(predicateValue)
			while(predicateValue = await this.predicate.execute(stepper, object, puzzle)){
				// await Promise.all(this.body.map(a => a.execute()))
				console.log(predicateValue)
				console.log("in while body")
				await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object, puzzle)), Promise.resolve())
				
			}
			this.hybernate()
		}
		else{
			for (let i = 0; i < (predicateValue as number); i++) {
				// await Promise.all(this.body.map(a => a.execute()))
				await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object, puzzle)), Promise.resolve())
				this.hybernate()
			}
		}
	}
	wakeup(): void {
		this.body.forEach(a => a.wakeup())
		this.exitHybernation()
	}
}