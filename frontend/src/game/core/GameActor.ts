class GameActor{
	private _primitive: PuzzleObject
	private _isSleeping: boolean

	constructor(object: PuzzleObject){
		this._primitive = object
		this._isSleeping = false
	}

	putToSleep(){
		this._isSleeping = true
	}
	isSleeping(){
		return this._isSleeping
	}
	getObject(){
		return this._primitive
	}
	id(){
		return this._primitive.id
	}
}