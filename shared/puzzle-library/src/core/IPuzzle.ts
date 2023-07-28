import { IRawPuzzle } from "../ports/IRawPuzzle"
import { IPuzzleObjectContainer } from "./IPuzzleObjectContainer"
import { IPuzzleSettings } from "./IPuzzleSettings"

export interface IPuzzle{
    raw: IRawPuzzle
    settings: IPuzzleSettings
    objects: IPuzzleObjectContainer
}