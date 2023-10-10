class GameResolver implements IGameResolver{
	
	constructor(){

	}
	resolve(puzzle: Puzzle): GameRound[] {
		let actors = PuzzleUtils.createActors(puzzle)
		actors.forEach(a => console.log(a.getObject().settings.name))
		return []
	}
}