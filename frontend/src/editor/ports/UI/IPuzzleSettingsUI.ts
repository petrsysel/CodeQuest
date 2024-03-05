import { Block, PuzzleSettings } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type PuzzleSettingsEvent = "settings-changed"
export type PuzzleSettingsData = PuzzleSettings

export interface IPuzzleSettingsUI {
    render(puzzle: PuzzleSettings, blocks: Block[]):void
    on(event: PuzzleSettingsEvent, callback:(data: PuzzleSettingsData) => void): void
}