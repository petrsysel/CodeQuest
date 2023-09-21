type ControlPanelUIEvents = "puzzle-settings-changed"|"play-puzzle"|"save-game"
type ControlPanelUIData = unknown
interface IControlPanelUI{
    render(settins: PuzzleSettings): void
    on(event: ControlPanelUIEvents, callback: (data: ControlPanelUIData) => void): void
}