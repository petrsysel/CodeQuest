class MoveInstruction implements IGameInstruction{
	private _object: PuzzleObject
	private _from: Vector2
	private _to: Vector2
	
	constructor(obj: PuzzleObject, from: Vector2, to: Vector2){
		this._object = obj
		this._from = from
		this._to = to
	}
}