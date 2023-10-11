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
				synchronizer.registerAction(actor, () => {
					console.log(`${actor.getObject().settings.name} goes forward!`)
					procedure.addInstruction(new MoveInstruction(actor.getObject(), new Vector2(0,0), new Vector2(2,4)))
				}, res => {
					resolve(res)
				})
			})
		}
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