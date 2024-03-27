import { AppState, IAppStateManager } from "../core/IAppStateManager";

export class AppStateManager implements IAppStateManager{
	private storageKey: string = 'cb-last-state'
	saveState(state: AppState): void {
		localStorage.setItem(this.storageKey, state)
	}
	loadLastState(): AppState {
		return (localStorage.getItem(this.storageKey) as AppState | undefined) || "public-puzzles"
	}
}