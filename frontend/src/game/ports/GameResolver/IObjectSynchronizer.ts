interface IObjectSynchronizer{
	registerAction(actor: GameActor, action: () => void): void
	constructor(...actors: GameActor[]): void
}