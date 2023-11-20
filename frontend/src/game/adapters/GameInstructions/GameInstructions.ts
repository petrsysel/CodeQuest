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

// type GameInstruction = {
// 	name: InstructionType
// 	objectId: string
// }
type GameInstruction = {
	name: InstructionType,
	objectId: string
} & Parameter

type Parameter =
	{side: "right" | "left"} |
	{direction: "up" | "right"| "down" | "left"} |
	{message: string} |
	{costumeName: string} |
	{backgroundName: string} |
	{x: number, y: number} |
	{layer: number} |
	{roundAmount: number} |
	{}

class Instruction {
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
}