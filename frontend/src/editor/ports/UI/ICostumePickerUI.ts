type CostumePickerEvent = "costume-pick"
type CostumePickerData = CostumeData

interface ICostumePickerUI {
    render(costumes: CostumeData[]):void
    on(event: CostumePickerEvent, callback:(data: CostumePickerData) => void): void
}