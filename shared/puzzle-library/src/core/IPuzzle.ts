import { IRawPuzzle } from "../ports/IRawPuzzle"
import { IPuzzleObjectContainer } from "./IPuzzleObjectContainer"
import { IPuzzleSettings } from "./IPuzzleSettings"

export interface IPuzzle{
    name: string
    raw: IRawPuzzle
    settings: IPuzzleSettings
    objects: IPuzzleObjectContainer
}