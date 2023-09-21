type ObjectSettingsUIEvents = "settings-changed" | "change-costume-request"
type ObjectSettingsUIData = PuzzleObjectSettings | null

interface IObjectSettingsUI{
    render(object: PuzzleObject | undefined): void
    on(event: ObjectSettingsUIEvents, callback: (data: ObjectSettingsUIData) => void): void
}