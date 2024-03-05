import { PuzzleSettings } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type ControlPanelUIEvents = "puzzle-settings-request"|"play-puzzle"|"save-game"|"stop-puzzle"
export type ControlPanelUIData = unknown
export interface IControlPanelUI{
    render(settins: PuzzleSettings): void
    on(event: ControlPanelUIEvents, callback: (data: ControlPanelUIData) => void): void
}