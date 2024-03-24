import { GameInstruction } from "../../../game/adapters/GameInstructions/GameInstructions"
import { Puzzle } from "../../../shared/puzzle-lib/core/Puzzle"
import { PuzzleObject, PuzzleObjectId, PuzzleSettings } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type BoardUIEvents = "object-selected"|"object-moved"
export type BoardUIData = {
    objectId: PuzzleObjectId,
    x: number,
    y: number
}

export interface IBoardUI {
    setSelected(objectId: PuzzleObjectId): void
    render(puzzleSettings: PuzzleSettings, objects: PuzzleObject[]): void
    on(event: BoardUIEvents, callback: (data: BoardUIData) => void): void
    animate(puzzleSettings: PuzzleSettings, objects: PuzzleObject[], instructions: GameInstruction[], puzzle: Puzzle): Promise<unknown>
    getPreviewImage(): string
}