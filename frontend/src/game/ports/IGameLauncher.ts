import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"

export type LauncherEvent = "done" | "fail"
export type LaucherData = GameInstruction[][]

export interface IGameLauncher{
	play(puzzle: Puzzle): void
	on(event: LauncherEvent, callback: (data: LaucherData) => void): void
}