class GameRound{
	private _instructions: IGameInstruction[]
	constructor(instructions: IGameInstruction[] = []){
		this._instructions = instructions
	}
	addInstruction(instruction: IGameInstruction){
		this._instructions.push(instruction)
	}
}