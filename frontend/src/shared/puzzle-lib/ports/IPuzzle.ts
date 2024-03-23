import { CodeEditorWorkspace } from "../../../editor/ports/UI/ICodeEditorUI"
import { CostumeData, PuzzleObject, PuzzleObjectId, PuzzleObjectSettings, PuzzleSettings } from "../core/PuzzleTypes"

export interface IPuzzle{
    addObject(): PuzzleObjectId
    removeObject(id: PuzzleObjectId): boolean
    changeObjectSettings(id: PuzzleObjectId, settings: PuzzleObjectSettings): boolean
    changeSettings(settings: PuzzleSettings): boolean
    getSettings(): PuzzleSettings
    getObjectSettings(id: PuzzleObjectId): PuzzleObjectSettings | undefined
    getObjectList(): PuzzleObject[]
    getObject(id: PuzzleObjectId | undefined): PuzzleObject | undefined
    changeObjectCostume(id: PuzzleObjectId, costume: CostumeData): boolean
    changeObjectCode(id: PuzzleObjectId | undefined, data: CodeEditorWorkspace): boolean
    getObjectCode(id: PuzzleObjectId|undefined): CodeEditorWorkspace | undefined
    setObjectPosition(id: PuzzleObjectId|undefined, x:number, y:number):boolean
}