import { PuzzleId } from "../../shared/puzzle-lib/core/PuzzleTypes"
import { StoredPuzzleInfo } from "./IServerAPI"
import { PuzzleListMode } from "./ISidebar"

export type PuzzleListEvent = 'search-request' | 'create-puzzle-request' | 'play-puzzle' | 'duplicate-puzzle' | 'remove-puzzle' | 'edit-request' | 'publish-request' | 'unpublish-request' | 'load-more'
export type PuzzleListData = {
    query?: string,
    puzzleId?: PuzzleId,
    mode?: PuzzleListMode
}
export type PuzzleListOptions = {
    mode: PuzzleListMode
    loggedUser: boolean,
    append: boolean,
    limit: number
}

export interface IPuzzleListUI {
    on(event: PuzzleListEvent, callback: (data: PuzzleListData) => void): void
    render(puzzleList: StoredPuzzleInfo[], options: PuzzleListOptions): void
}