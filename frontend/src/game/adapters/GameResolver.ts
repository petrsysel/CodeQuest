import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { Utility } from "../../shared/utils/Utility"
import { GameActor } from "../core/GameActor"
import { GameMessageCallback } from "../core/GameMessageCallback"
import { GameProcedure } from "../core/GameProcedure"
import { GameInstruction, Instruction } from "./GameInstructions/GameInstructions"
import { ObjectSynchronizer } from "./ObjectSynchronizer"

export class GameResolver{
	private _procedure
	private _synchronizer

	private _puzzle
	private _actors

	private _callbacks: GameMessageCallback[] = []

	constructor(puzzle: Puzzle, actors: GameActor[], onRoundAdded: () => void){
		this._puzzle = puzzle
		this._actors = actors
		this._procedure = new GameProcedure()
		this._synchronizer = new ObjectSynchronizer(actors)

		this.resolve(this._puzzle, this._actors, this._synchronizer,this._procedure, onRoundAdded)
	}

	getRounds(){
		return this._procedure.getRounds()
	}

	resolve(puzzle: Puzzle, actors: GameActor[], synchronizer: ObjectSynchronizer, procedure: GameProcedure, onRoundAdded: () => void): void {
		

		synchronizer.on('round-end', () => {
			procedure.next()
			onRoundAdded()
		})

		const createAction = async (actor: GameActor, action: () => void) => {
			return new Promise((resolve, reject) => {
				synchronizer.registerAction(
					actor, 
					action,
					res => {
						resolve(res)
					}
				)
			})
		}

		let goForward = async function goForward(actor: GameActor) {
			let instr: GameInstruction = Instruction.goForward(actor.id())
			return createAction(actor, () => {
				puzzle.commands.goForward(actor.id())
				procedure.addInstruction(instr)
			})
		}
		
		let jump = async (actor: GameActor) => {
			return createAction(actor, () => {
				puzzle.commands.jump(actor.id())
				const instr = Instruction.jump(actor.id())
				procedure.addInstruction(instr)
			})
		}
		let turn = async (actor: GameActor, direction: string) => {
			return createAction(actor, () => {
				puzzle.commands.turn(actor.id(), direction)
				const instr = Instruction.turn(actor.id(), direction as "right" | "left")
				procedure.addInstruction(instr)
			})
		}
		let setDirection = async (actor: GameActor, direction: string) => {
			puzzle.commands.setDirection(actor.id(), direction)
			const instr = Instruction.setDirection(actor.id(), direction as "up" | "right" | "down" | "left")
			procedure.addInstruction(instr)
		}
		let jumpTo = async (actor: GameActor, x: number, y: number) => {
			puzzle.commands.jumpTo(actor.id(), x, y)
			const instr = Instruction.jumpTo(actor.id(), x, y)
			procedure.addInstruction(instr)
		}
		let getX = async (actor: GameActor) => {
			return puzzle.commands.getX(actor.id())
		}
		let getY = async (actor: GameActor) => {
			return puzzle.commands.getY(actor.id())
		}
		let getDirection = async (actor: GameActor) => {
			return puzzle.commands.getDirection(actor.id())
		}
		let say = async (actor: GameActor, message: string) => {
			const instr = Instruction.say(actor.id(), message)
			procedure.addInstruction(instr)
		}
		let changeCostume = async (actor: GameActor, costume: string) => {
			const instr = Instruction.changeCostume(actor.id(), costume)
			procedure.addInstruction(instr)
		}
		let changeBackground = async (actor: GameActor, background: string) => {
			const instr = Instruction.changeBackground(actor.id(), background)
			procedure.addInstruction(instr)
		}
		let show = async (actor: GameActor) => {
			puzzle.commands.show(actor.id())
			const instr = Instruction.show(actor.id())
			procedure.addInstruction(instr)
		}
		let hide = async (actor: GameActor) => {
			puzzle.commands.hide(actor.id())
			const instr = Instruction.hide(actor.id())
			procedure.addInstruction(instr)
		}
		let setLayer = async (actor: GameActor, layer: number) => {
			const instr = Instruction.setLayer(actor.id(), layer)
			procedure.addInstruction(instr)
		}
		
		let registerMessageCallback = async (actor: GameActor, message: string, callback: () => void) => {
			this._callbacks.push({
				id: actor.id(),
				message: message,
				callback: callback
			})
		}

		let sendMessage = async (actor: GameActor, message: string) => {
			const queue = [...this._callbacks.filter(c => c.message == message)]
			for(const c of queue){
				queue.splice(queue.indexOf(c),1)
				await c.callback()
			}
		}

		let wait = async (actor: GameActor, turnCount: number) => {
			return createAction(actor, () => {
				const instr = Instruction.wait(actor.id(), turnCount)
				procedure.addInstruction(Instruction.wait(actor.id(), 1))
			})
		}
		let win = async (actor: GameActor, message: string) => {
			// procedure.addInstruction(new Win(actor.id(), message))
			const instr = Instruction.win(actor.id(), message)
			procedure.addInstruction(instr)
		}
		let gameOver = async (actor: GameActor, message: string) => {
			const instr = Instruction.gameOver(actor.id(), message)
			procedure.addInstruction(instr)
		}
		let isTouch = async (actor: GameActor, objectName: string) => {
			return puzzle.commands.isTouch(actor.id(), objectName)
		}
		let isInFrontOfMe = async (actor: GameActor, objectName: string) => {
			return puzzle.commands.isInFrontOfMe(actor.id(), objectName)
		}
		let distanceTo = async(actor: GameActor, objectName: string) => {
			return puzzle.commands.distanceTo(actor.id(), objectName)
		}

		actors.forEach(actor => {
			let id = actor.getObject().id
			let mark = 'fn' + id.split('-').join('_')
			let code = actor.getCode()
			
			code = code.replaceAll("function ", "async function ")
			const regexMatch = code.match(/function\s+(\w+)\s*\(/)
			if(regexMatch != null){
				const funcName = regexMatch[1]
				const functionRegex = new RegExp(`(?<!function\\s+)\\b${funcName}\\(`, "g");
				code = code.replaceAll(functionRegex, `await ${funcName}(`)
			}

			let func = `async function ${mark}(){\n
				${code};\n
				// for(let i = 0; i < 100; i++){
				while(true){\n
					${Utility.getRuleCheckCode()};\n
					await wait(actor, 1);\n
				};\n
			};\n
			${mark}();`

			const f = new Function('actor','goForward', 'turn', "jump", "setDirection", "jumpTo", "getX", "getY", "getDirection", "say", "changeCostume", "changeBackground", "show", "hide", "setLayer", "wait", "win", "gameOver", "isTouch", "isInFrontOfMe", "distanceTo", "registerMessageCallback", "sendMessage", func)
			
			f(actor, goForward, turn, jump, setDirection, jumpTo, getX, getY, getDirection, say, changeCostume, changeBackground, show, hide, setLayer, wait, win, gameOver, isTouch, isInFrontOfMe, distanceTo,
				registerMessageCallback, sendMessage)
		})
	}
}