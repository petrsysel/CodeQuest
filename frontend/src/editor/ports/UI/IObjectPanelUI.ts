import { PuzzleObject, PuzzleObjectId } from "../../../shared/puzzle-lib/core/PuzzleTypes"

export type ObjectPanelUIEvents = "object-removed"|"object-added"|"object-duplicated"|"object-selected" 

// ObjectPanelDataSelection
export type OPDSelection = {
    id: string
}
export type ObjectPanelUIData = OPDSelection | null

export interface IObjectPanelUI {
    render(objects: PuzzleObject[]):void
    setSelected(objectId: PuzzleObjectId): void
    on(event: ObjectPanelUIEvents, callback: (data: ObjectPanelUIData) => void): void
}