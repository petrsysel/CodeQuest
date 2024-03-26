import { PuzzleSettings } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type ControlPanelUIEvents = "puzzle-settings-request"|"play-puzzle"|"save-game"|"stop-puzzle"|"speed-change"
export type ControlPanelUIData = null | {
    speed?: number
}
export interface IControlPanelUI{
    render(settins: PuzzleSettings): void
    on(event: ControlPanelUIEvents, callback: (data: ControlPanelUIData) => void): void
}