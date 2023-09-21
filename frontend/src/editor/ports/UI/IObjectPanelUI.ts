type ObjectPanelUIEvents = "object-removed"|"object-added"|"object-selected" 

// ObjectPanelDataSelection
type OPDSelection = {
    id: string
}
type ObjectPanelUIData = OPDSelection | null

interface IObjectPanelUI {
    render(objects: PuzzleObject[]):void
    setSelected(objectId: PuzzleObjectId): void
    on(event: ObjectPanelUIEvents, callback: (data: ObjectPanelUIData) => void): void
}