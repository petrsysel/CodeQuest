type ControlPanelUIEvents = "puzzle-settings-request"|"play-puzzle"|"save-game"|"stop-puzzle"
type ControlPanelUIData = unknown
interface IControlPanelUI{
    render(settins: PuzzleSettings): void
    on(event: ControlPanelUIEvents, callback: (data: ControlPanelUIData) => void): void
}