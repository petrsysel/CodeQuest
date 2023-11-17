interface IGameResolver {
	resolve(puzzle: Puzzle, actors: GameActor[]): GameRound[]
}