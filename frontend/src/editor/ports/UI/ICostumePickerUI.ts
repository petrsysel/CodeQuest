type CostumePickerEvent = "costume-pick"
type CostumePickerData = {
    costumePath:string
}

interface ICostumePickerUI {
    render(images:string[]):void
    on(event: CostumePickerEvent, callback:(data: CostumePickerData) => void): void
}