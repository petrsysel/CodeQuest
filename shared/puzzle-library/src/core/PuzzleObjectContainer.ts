import { IPuzzleObject } from "./IPuzzleObject";
import { IPuzzleObjectContainer } from "./IPuzzleObjectContainer";

export class PuzzleObjectContainer implements IPuzzleObjectContainer{
    objects: IPuzzleObject[];

    constructor(){
        this.objects = []
    }
}