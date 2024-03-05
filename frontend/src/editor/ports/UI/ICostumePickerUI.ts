import { CostumeData } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type CostumePickerEvent = "costume-pick"
export type CostumePickerData = CostumeData

export interface ICostumePickerUI {
    render(costumes: CostumeData[]):void
    on(event: CostumePickerEvent, callback:(data: CostumePickerData) => void): void
}