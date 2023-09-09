import { IPuzzleObject } from "./IPuzzleObject";

export interface IPuzzleObjectContainer{
    objects: IPuzzleObject[]
    add(puzzleObject: IPuzzleObject):boolean
    count():number
}