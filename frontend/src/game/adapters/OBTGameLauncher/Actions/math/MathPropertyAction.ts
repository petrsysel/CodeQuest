import { Puzzle } from "../../../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject } from "../../../../../shared/puzzle-lib/core/PuzzleTypes"
import { Stepper } from "../../Stepper"
import { Action } from "../Action"

type MathProperty = "EVEN" | "ODD" | "PRIME" | "WHOLE" | "POSITIVE" | "NEGATIVE" | "DIVISIBLY_BY"
export class MathPropertyAction extends Action<boolean>{
	private property: MathProperty
	private numberToCheck: Action<number>
	private divisor: Action<number> | undefined

	constructor(operation: MathProperty, numberToCheck: Action<number>, divisor: Action<number> | undefined){
		super()
		this.property = operation
		this.numberToCheck = numberToCheck
		this.divisor = divisor
	}
	execute(stepper: Stepper, object: PuzzleObject, puzzle: Puzzle): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			let value = await this.numberToCheck.execute(stepper, object, puzzle)
			let divisor = this.divisor ?
				await this.divisor.execute(stepper, object, puzzle): 0

			const isPrime = (num: number) => {
				for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
					if(num % i === 0) return false;
				}
				return num > 1;
			}

			let result: boolean
			if(this.property === "EVEN"){
				result = value % 2 === 0
			}
			else if(this.property === "ODD"){
				result = value % 2 !== 0
			}
			else if(this.property === "POSITIVE"){
				result = value > 0
			}
			else if(this.property === "NEGATIVE"){
				result = value < 0
			}
			else if(this.property === "PRIME"){
				result = isPrime(value)
			}
			else if(this.property === "WHOLE"){
				result = value % 1 === 0
			}
			else{
				result = value % divisor === 0
			}

			resolve(result)
			this.hybernate()
		})
	}
	wakeup(): void {
		this.exitHybernation()
	}
}