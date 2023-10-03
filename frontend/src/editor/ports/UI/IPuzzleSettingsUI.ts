type PuzzleSettingsEvent = "settings-changed"
type PuzzleSettingsData = PuzzleSettings

interface IPuzzleSettingsUI {
    render(puzzle: PuzzleSettings, blocks: Block[]):void
    on(event: PuzzleSettingsEvent, callback:(data: PuzzleSettingsData) => void): void
}