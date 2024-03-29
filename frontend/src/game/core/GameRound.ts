import { GameInstruction } from "../adapters/GameInstructions/GameInstructions"

export class GameRound{
	private _instructions: GameInstruction[]
	constructor(instructions: GameInstruction[] = []){
		this._instructions = instructions
	}
	addInstruction(instruction: GameInstruction){
		this._instructions.push(instruction)
	}

	getInstructions(){
		return this._instructions
	}
}