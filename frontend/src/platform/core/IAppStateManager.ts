export type AppState = "custom-puzzles" | "public-puzzles"

export interface IAppStateManager {
	saveState(state: AppState): void
	loadLastState(): AppState
}