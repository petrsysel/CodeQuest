class GameProcedure{
	private _rounds: GameRound[]

	constructor(){
		this._rounds = []
		this.next()
	}

	next(){
		this._rounds.push(new GameRound([]))
	}

	addInstruction(instruction: GameInstruction){
		this._rounds[this._rounds.length-1].addInstruction(instruction)
	}

	getRounds(){
		return [...this._rounds]
	}
}