class GoForward implements IGameInstruction{
	objectId: PuzzleObjectId
	
	constructor(objectId: PuzzleObjectId){
		this.objectId = objectId
	}
}

class Jump implements IGameInstruction{
	objectId: PuzzleObjectId
	
	constructor(objectId: PuzzleObjectId){
		this.objectId = objectId
	}
}

class Turn implements IGameInstruction{
	objectId: PuzzleObjectId
	direction: string
	constructor(objectId: PuzzleObjectId, direction: string){
		this.objectId = objectId
		this.direction = direction
	}
}

class SetDirection implements IGameInstruction{
	objectId: PuzzleObjectId
	direction: string
	constructor(objectId: PuzzleObjectId, direction: string){
		this.objectId = objectId
		this.direction = direction
	}
}

class JumpTo implements IGameInstruction{
	objectId: PuzzleObjectId
	x: number
	y: number
	constructor(objectId: PuzzleObjectId, x: number, y: number){
		this.objectId = objectId
		this.x = x
		this.y = y
	}
}

class Say implements IGameInstruction{
	objectId: PuzzleObjectId
	message: string
	constructor(objectId: PuzzleObjectId, message: string){
		this.objectId = objectId
		this.message = message
	}
}

class ChangeCostume implements IGameInstruction{
	objectId: PuzzleObjectId
	costumeName: string
	constructor(objectId: PuzzleObjectId, costumeName: string){
		this.objectId = objectId
		this.costumeName = costumeName
	}
}

class ChangeBackground implements IGameInstruction{
	objectId: PuzzleObjectId
	background: string
	constructor(objectId: PuzzleObjectId, background: string){
		this.objectId = objectId
		this.background = background
	}
}

class Show implements IGameInstruction{
	objectId: PuzzleObjectId
	constructor(objectId: PuzzleObjectId){
		this.objectId = objectId
	}
}

class Hide implements IGameInstruction{
	objectId: PuzzleObjectId
	constructor(objectId: PuzzleObjectId){
		this.objectId = objectId
	}
}

class SetLayer implements IGameInstruction{
	objectId: PuzzleObjectId
	layer: number
	constructor(objectId: PuzzleObjectId, layer: number){
		this.objectId = objectId
		this.layer = layer
	}
}

class SendMessage implements IGameInstruction{
	objectId: PuzzleObjectId
	message: string
	constructor(objectId: PuzzleObjectId, message: string){
		this.objectId = objectId
		this.message = message
	}
}

class Wait implements IGameInstruction{
	objectId: PuzzleObjectId
	turnCount: number
	constructor(objectId: PuzzleObjectId, turnCount: number){
		this.objectId = objectId
		this.turnCount = turnCount
	}
}

class Win implements IGameInstruction{
	objectId: PuzzleObjectId
	message: string
	constructor(objectId: PuzzleObjectId, message: string){
		this.objectId = objectId
		this.message = message
	}
}

class GameOver implements IGameInstruction{
	objectId: PuzzleObjectId
	message: string
	constructor(objectId: PuzzleObjectId, message: string){
		this.objectId = objectId
		this.message = message
	}
}