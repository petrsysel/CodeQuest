import { StoredPuzzleInfo } from "./IServerAPI"

export type PuzzleListEvent = 'search-request' | 'create-puzzle-request' | 'play-puzzle' | 'duplicate-puzzle' | 'remove-puzzle'
export type PuzzleListData = {
    query?: string,
    puzzleId?: PuzzleId
}

export interface IPuzzleListUI {
    on(event: PuzzleListEvent, callback: (data: PuzzleListData) => void): void
    render(puzzleList: StoredPuzzleInfo[]): void
}