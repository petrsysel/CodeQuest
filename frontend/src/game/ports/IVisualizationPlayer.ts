import { Puzzle } from "../../shared/puzzle-lib/core/Puzzle"
import { GameInstruction } from "../adapters/GameInstructions/GameInstructions"

export type VisualizerEvent = "stoped"
export type VisualizerData = null
export interface IVisualizationPlayer{
	play(resolvedGame: GameInstruction[][], puzzle: Puzzle): Promise<void>
	stop(): void
	isPlaying(): boolean
	on(event: VisualizerEvent, callback: (data: VisualizerData) => void): void
}