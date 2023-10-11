interface IObjectSynchronizer{
	registerAction(actor: GameActor, action: () => void, onFinished: (resutl:any) => void): void
}