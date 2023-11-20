class GameRound{
	private _instructions: GameInstruction[]
	constructor(instructions: GameInstruction[] = []){
		this._instructions = instructions
	}
	addInstruction(instruction: GameInstruction){
		this._instructions.push(instruction)
	}
}