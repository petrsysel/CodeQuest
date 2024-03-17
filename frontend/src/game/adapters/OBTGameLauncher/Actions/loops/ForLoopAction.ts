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
	async execute(stepper: Stepper, object: PuzzleObject): Promise<void> {
		let predicateValue = await this.predicate.execute(stepper, object)
		if(typeof predicateValue === 'boolean'){
			while(predicateValue = await this.predicate.execute(stepper, object)){
				// await Promise.all(this.body.map(a => a.execute()))
				await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object)), Promise.resolve())
				this.hybernate()
			}
			
		}
		else{
			for (let i = 0; i < predicateValue; i++) {
				// await Promise.all(this.body.map(a => a.execute()))
				await this.body.reduce((p, fn) => p.then(() => fn.execute(stepper, object)), Promise.resolve())
				this.hybernate()
			}
		}
	}
	wakeup(): void {
		this.body.forEach(a => a.wakeup())
		this.exitHybernation()
	}
}