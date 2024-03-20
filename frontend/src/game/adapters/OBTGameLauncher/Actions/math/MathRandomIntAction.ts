import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

export class MathRandomIntAction extends Action<number>{
	private from: Action<number>
	private to: Action<number>

	constructor(from: Action<number>, to: Action<number>){
		super()
		this.from = from
		this.to = to
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<number> {
		return new Promise(async (resolve, reject) => {
			let fromValue = await this.from.execute(stepper, object, puzzle)
			let toValue = await this.to.execute(stepper, object, puzzle)

			function getRandomArbitrary(min: number, max: number) {
				return Math.random() * (max - min) + min;
			}
			
			function getRandomInt(min: number, max: number) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}

			let result = getRandomInt(fromValue, toValue)

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}