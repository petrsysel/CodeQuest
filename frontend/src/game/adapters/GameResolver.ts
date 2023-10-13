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

		let goForward = async function goForward(actor: GameActor) {
			return new Promise((resolve, reject) => {
				synchronizer.registerAction(
				actor, 
				() => {
					puzzle.commandGoForward(actor.id())
					procedure.addInstruction(new GoForward(actor.id()))
				}, res => {
					resolve(res)
				})
			})
		}

		let jump = async (actor: GameActor) => {
			return new Promise((resolve, reject) => {
				synchronizer.registerAction(actor, () => {
					puzzle.commandJump(actor.id())
					procedure.addInstruction(new Jump(actor.id()))
				}, res => {
					resolve(res)
				})
			})
		}
		// `await jump(actor)\n`;
		// `await turn(actor, ${direction})\n`;
		// `await setDirection(actor, ${value_direction})\n`;
		// `await jumpTo(actor, ${value_x_position}, ${value_y_position})\n`;
		// `await directionPick(actor, ${dropdown_direction})`;
		// `await getX(actor)`;
		// `await getY(actor)`;
		// `await getDirection(actor)`;
		// `await say(actor, ${value_message_to_say})\n`;
		// `await changeCostume(actor, ${value_costume_name})\n`;
		// `await changeBackground(actor, ${value_background_name})\n`;
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