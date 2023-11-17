class GameResolver{
	private _procedure
	private _synchronizer

	private _puzzle
	private _actors

	constructor(puzzle: Puzzle, actors: GameActor[]){
		this._puzzle = puzzle
		this._actors = actors
		this._procedure = new GameProcedure()
		this._synchronizer = new ObjectSynchronizer(actors)

		this.resolve(this._puzzle, this._actors, this._synchronizer,this._procedure)
	}

	getRounds(){
		return this._procedure.getRounds()
	}

	resolve(puzzle: Puzzle, actors: GameActor[], synchronizer: ObjectSynchronizer, procedure: GameProcedure): GameRound[] {
		

		synchronizer.on('round-end', () => {
			procedure.next()
			
			console.log(procedure.getRounds())
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
			return createAction(actor, () => {
				puzzle.commands.goForward(actor.id())
				procedure.addInstruction(new GoForward(actor.id()))
			})
		}
		
		let jump = async (actor: GameActor) => {
			return createAction(actor, () => {
				puzzle.commands.jump(actor.id())
				procedure.addInstruction(new Jump(actor.id()))
			})
		}
		let turn = async (actor: GameActor, direction: string) => {
			return createAction(actor, () => {
				puzzle.commands.turn(actor.id(), direction)
				procedure.addInstruction(new Turn(actor.id(), direction))
			})
		}
		let setDirection = async (actor: GameActor, direction: string) => {
			puzzle.commands.setDirection(actor.id(), direction)
			procedure.addInstruction(new SetDirection(actor.id(), direction))
		}
		let jumpTo = async (actor: GameActor, x: number, y: number) => {
			puzzle.commands.jumpTo(actor.id(), x, y)
			procedure.addInstruction(new JumpTo(actor.id(), x, y))
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
			procedure.addInstruction(new Say(actor.id(), message))
		}
		let changeCostume = async (actor: GameActor, costume: string) => {
			procedure.addInstruction(new ChangeCostume(actor.id(), costume))
		}
		let changeBackground = async (actor: GameActor, background: string) => {
			procedure.addInstruction(new ChangeBackground(actor.id(), background))
		}
		let show = async (actor: GameActor) => {
			puzzle.commands.show(actor.id())
			procedure.addInstruction(new Show(actor.id()))
		}
		let hide = async (actor: GameActor) => {
			puzzle.commands.hide(actor.id())
			procedure.addInstruction(new Hide(actor.id()))
		}
		let setLayer = async (actor: GameActor, layer: number) => {
			procedure.addInstruction(new SetLayer(actor.id(), layer))
		}
		
		// `async function checkRule(){
		// 		${statements_rule_check_body}\n
		// 	}`;
		// `await sendMessage(actor, ${value_message_name})\n`;
		// `async function onMessageRecieve(){}// tohle si musím ještě promyslet\n`;

		let wait = async (actor: GameActor, turnCount: number) => {
			return createAction(actor, () => {

			})
		}
		let win = async (actor: GameActor, message: string) => {
			procedure.addInstruction(new Win(actor.id(), message))
		}
		let gameOver = async (actor: GameActor, message: string) => {
			procedure.addInstruction(new GameOver(actor.id(), message))
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
		// `await distanceTo(actor, ${value_object_name})`;

		actors.forEach(actor => {
			let id = actor.getObject().id
			let mark = 'fn' + id.split('-').join('_')
			let code = actor.getCode()
			let func = `async function ${mark}(){
				${code};
				await console.log('end of code ${id}')
			};
			${mark}();`
			console.log(func)
			const f = new Function('actor','goForward', func)
			f(actor, goForward)
		})
		return procedure.getRounds()
	}
}