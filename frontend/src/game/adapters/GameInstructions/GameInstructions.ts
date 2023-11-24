type InstructionType =
	"goforward" |
	"jump" |
	"turn" |
	"setdirection" |
	"jumpto" |
	"say" |
	"changecostume" |
	"changebackground" |
	"show" |
	"hide" |
	"setlayer" |
	"sendmessage" |
	"wait" |
	"win" |
	"gameover"

type GameInstruction = {
	name: InstructionType,
	objectId: string
} & Parameter

type QueuedInstruction = {
	instruction: GameInstruction,
	roundAmount: number
}

type Parameter = {
	side?: "right" | "left",
	direction?: "up" | "right"| "down" | "left",
	message?: string,
	costumeName?: string,
	backgroundName?: string,
	x?: number, y?: number,
	layer?: number,
	roundAmount?: number
}

class Instruction {
	static instantInstructions: InstructionType[] = [
		"changebackground",
		"changecostume",
		"jumpto",
		"setdirection",
		"setlayer",
		"show",
		"hide"
	]
	static goForward(objectId: string): GameInstruction {
		return {
			objectId: objectId,
			name: "goforward",
		}
	}
	static jump(objectId: string): GameInstruction{
		return {
			objectId: objectId,
			name: "jump"
		}
	}
	static turn(objectId: string, direction: "left" | "right"): GameInstruction{
		return {
			objectId: objectId,
			name: "turn",
			side: direction
		}
	}
	static setDirection(objectId: string, direction: "up" | "right" | "down" | "left"): GameInstruction{
		return {
			objectId: objectId,
			name: "setdirection",
			direction: direction
		}
	}
	static jumpTo(objectId: string, x: number, y: number): GameInstruction{
		return {
			objectId: objectId,
			name: "jumpto",
			x:x,
			y:y
		}
	}
	static say(objectId: string, message: string): GameInstruction{
		return {
			objectId: objectId,
			name: "say",
			message: message
		}
	}
	static changeCostume(objectId: string, costumeName: string): GameInstruction{
		return {
			objectId: objectId,
			name: "changecostume",
			costumeName: costumeName
		}
	}
	static changeBackground(objectId: string, backgroundName: string): GameInstruction{
		return {
			objectId: objectId,
			name: "changebackground",
			backgroundName: backgroundName
		}
	}
	static show(objectId: string): GameInstruction{
		return {
			objectId: objectId,
			name: "show"
		}
	}
	static hide(objectId: string): GameInstruction{
		return {
			objectId: objectId,
			name: "hide"
		}
	}
	static setLayer(objectId: string, layer: number): GameInstruction {
		return {
			objectId: objectId,
			name: "setlayer",
			layer: layer
		}
	}
	static sendMessage(objectId: string, message: string): GameInstruction{
		return {
			objectId: objectId,
			name: "sendmessage",
			message: message
		}
	}
	static wait(objectId: string, roundAmount: number): GameInstruction{
		return {
			objectId: objectId,
			name:"wait",
			roundAmount: roundAmount
		}
	}
	static win(objectId: string, message: string): GameInstruction{
		return {
			objectId: objectId,
			name:"win",
			message: message
		}
	}
	static gameOver(objectId: string, message: string): GameInstruction{
		return {
			objectId: objectId,
			name:"gameover",
			message: message
		}
	}

	static performOnPuzzle(instruction: GameInstruction, puzzle: Puzzle){
		switch(instruction.name){
			case "changebackground":
				// Bude změněna cesta k backgroundu v puzzle.settings
				const newBackground = instruction.backgroundName
				break
			case "changecostume":
				const newCostume = instruction.costumeName as string
				const costume = getMockCostumes().find(c => c.name == newCostume)
				console.log(costume)
				if(costume) puzzle.changeObjectCostume(instruction.objectId, costume)
				break
			case "gameover":
				// Zde není třeba provádět žádné zvláštní akce
				// Instrukce nemá vliv na strukturu Puzzle
				break
			case "goforward":
				puzzle.commands.goForward(instruction.objectId)
				break
			case "hide":
				puzzle.commands.hide(instruction.objectId)
				break
			case "jump":
				puzzle.commands.jump(instruction.objectId)
				break
			case "jumpto":
				const x = instruction.x as number
				const y = instruction.y as number
				puzzle.commands.jumpTo(instruction.objectId, x, y)
				break
			case "say":
				// Zde není třeba provádět žádné zvláštní akce
				// Instrukce nemá vliv na strukturu Puzzle
				break
			case "sendmessage":
				// Zde není třeba provádět žádné zvláštní akce
				// Instrukce nemá vliv na strukturu Puzzle
				break
			case "setdirection":
				const direction = instruction.direction as "up" | "right" | "down" | "left"
				puzzle.commands.setDirection(instruction.objectId, direction)
				break
			case "setlayer":
				const layer = instruction.layer as number
				puzzle.commands.setLayer(instruction.objectId, layer)
				break
			case "show":
				puzzle.commands.show(instruction.objectId)
				break
			case "turn":
				const side = instruction.side as "right" | "left"
				puzzle.commands.turn(instruction.objectId, side)
				break
			case "wait":
				// Zde není třeba provádět žádné zvláštní akce
				// Instrukce nemá vliv na strukturu Puzzle
				break
			case "win":
				// Zde není třeba provádět žádné zvláštní akce
				// Instrukce nemá vliv na strukturu Puzzle
				break
		}
	}
	static instant(instructions: GameInstruction[]){
		return instructions.filter(i => this.instantInstructions.includes(i.name))
	}
	static takeTime(instructions: GameInstruction[]){
		return instructions.filter(i => !this.instantInstructions.includes(i.name))
	}

	static async withNotification(instructions: GameInstruction[], notificationUI: INotificationUI){
		for(const i of instructions){
			if(i.name == "say"){
				const message = i.message as string
				await notificationUI.notify(message)
			}
		}
	}
}