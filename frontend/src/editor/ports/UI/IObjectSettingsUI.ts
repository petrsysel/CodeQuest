import { PuzzleObject, PuzzleObjectSettings } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type ObjectSettingsUIEvents = "settings-changed" | "change-costume-request"
export type ObjectSettingsUIData = PuzzleObjectSettings | null

export interface IObjectSettingsUI{
    render(object: PuzzleObject | undefined): void
    on(event: ObjectSettingsUIEvents, callback: (data: ObjectSettingsUIData) => void): void
}