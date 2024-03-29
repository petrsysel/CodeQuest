import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { SharedData } from "../../SharedData"
import { Stepper } from "../../Stepper"
import { Action, ActionList } from "../Action"

type IfDoPair = {
	ifStatement: Action<boolean>,
	doStatement: Action<any>[]
}
export class IfAction extends Action<void>{
	private ifDoPairs: IfDoPair[]
	private elseStatement: Action<any>[]
	private statementAmount: number

	constructor(ifDoPairs: IfDoPair[], elseStatement: Action<any>[]){
		super()
		this.ifDoPairs = ifDoPairs
		this.statementAmount = ifDoPairs.length
		this.elseStatement = elseStatement
	}
	async execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle, sharedData: SharedData): Promise<void> {
		const checkStatement = async (i: number) => {
			if(i < this.statementAmount){
				const predicate = this.ifDoPairs[i].ifStatement
				const predicateValidity = await predicate.execute(stepper, object, puzzle, sharedData)
				if(predicateValidity){
					await this.ifDoPairs[i].doStatement.reduce((p, fn) => p.then(() => fn.execute(stepper, object, puzzle, sharedData)), Promise.resolve())
					this.hybernate()
				}
				else{
					await checkStatement(i + 1)
				}
			}
			else{
				if(this.elseStatement) this.elseStatement.reduce((p, fn) => p.then(() => fn.execute(stepper, object, puzzle, sharedData)), Promise.resolve())
				this.hybernate()
			}
			
		}
		await checkStatement(0)
	}
	wakeup(): void {
		this.ifDoPairs.forEach(pair => {
			pair.ifStatement.wakeup()
			pair.doStatement.forEach(doStatement => {
				doStatement.wakeup()
			})
		})
		if(this.elseStatement) this.elseStatement.forEach(a => a.wakeup())
		this.exitHybernation()
	}
}