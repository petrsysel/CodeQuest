type VisualizerEvent = "stoped"
type VisualizerData = null
interface IVisualizationPlayer{
	play(resolvedGame: GameInstruction[][], puzzle: Puzzle): Promise<void>
	stop(): void
	isPlaying(): boolean
	on(event: VisualizerEvent, callback: (data: VisualizerData) => void): void
}