import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { GameInstruction } from "../adapters/GameInstructions/GameInstructions"

export type LauncherEvent = "done" | "fail"
export type LaucherData = {
	resolvedGame: GameInstruction[][],
	error?: string
}

export interface IGameLauncher{
	play(puzzle: Puzzle): void
	on(event: LauncherEvent, callback: (data: LaucherData) => void): void
}