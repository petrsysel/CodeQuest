import { Vector2 } from "@utils";
import { IPuzzleObjectData } from "./IPuzzleObjectData";

export class PuzzleObjectData implements IPuzzleObjectData{
    position: Vector2;

    constructor(position: Vector2){
        this.position = position
    }
}