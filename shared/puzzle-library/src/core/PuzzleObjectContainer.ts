import { IPuzzleObject } from "./IPuzzleObject";
import { IPuzzleObjectContainer } from "./IPuzzleObjectContainer";

export class PuzzleObjectContainer implements IPuzzleObjectContainer{
    objects: IPuzzleObject[];

    constructor(){
        this.objects = []
    }

    add(puzzleObject: IPuzzleObject): boolean {
        this.objects.push(puzzleObject)
        return true
    }

    count(): number {
        return this.objects.length
    }
}