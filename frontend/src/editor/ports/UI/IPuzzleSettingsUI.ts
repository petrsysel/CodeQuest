type PuzzleSettingsEvent = "costume-pick"
type PuzzleSettingsData = CostumeData

interface IPuzzleSettingsUI {
    render(puzzle: PuzzleSettings, blocks: Block[]):void
    on(event: PuzzleSettingsEvent, callback:(data: PuzzleSettingsData) => void): void
}