class GameResolver implements IGameResolver{
	
	constructor(){

	}
	resolve(puzzle: Puzzle): GameRound[] {
		let actors = PuzzleUtils.createActors(puzzle)
		let procedure = new GameProcedure()
		let synchronizer = new ObjectSynchronizer(actors)

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
		
		// `await show(actor)\n`;
		// `await hide(actor)\n`;
		// `await setLayer(actor, ${value_layer})\n`;
		// `// on_start nebude potřeba\n`;
		// `async function checkRule(){
		// 		${statements_rule_check_body}\n
		// 	}`;
		// `await sendMessage(actor, ${value_message_name})\n`;
		// `// tohle si musím ještě promyslet\n`;
		// `await wait(actor, ${value_turn_count})\n`;
		// `await win(actor, ${value_win_message})\n`;
		// `await gameOver(actor, ${value_game_over_message})\n`;
		// `await isTouch(actor, ${value_object_name})`;
		// `await isInFrontOfMe(actor, ${value_object_name})`;
		// `await distanceTo(actor, ${value_object_name})`;

		actors.forEach(actor => {
			let id = actor.getObject().id
			let mark = 'fn' + id.split('-').join('_')
			let code = BlocklyGenerator.getCodeFor(actor.getObject())
			let func = `async function ${mark}(){
				${code};
				await console.log('end of code ${id}')
			};
			${mark}();`
			console.log(func)
			eval(func)
		})
		return []
	}
}