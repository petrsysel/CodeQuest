type LauncherEvent = "done" | "fail"
type LaucherData = GameInstruction[][]

interface IGameLauncher{
	play(puzzle: Puzzle): void
	on(event: LauncherEvent, callback: (data: LaucherData) => void): void
}