class GameActor{
	private _primitive: PuzzleObject
	private _isSleeping: boolean
	private _code: string

	constructor(object: PuzzleObject, code: string){
		this._primitive = object
		this._code = code
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
	getCode(){
		return this._code
	}
	id(){
		return this._primitive.id
	}
}