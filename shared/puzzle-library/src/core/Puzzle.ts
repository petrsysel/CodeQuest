import { IRawPuzzle } from "../ports/IRawPuzzle";
import { IPuzzle } from "./IPuzzle";
import { IPuzzleObjectContainer } from "./IPuzzleObjectContainer";
import { IPuzzleSettings } from "./IPuzzleSettings";
import { PuzzleObjectContainer } from "./PuzzleObjectContainer";
import { PuzzleSettings } from "./PuzzleSettings";

export class Puzzle implements IPuzzle{
    name: string
    raw: IRawPuzzle
    settings: PuzzleSettings;
    objects: IPuzzleObjectContainer;

    constructor(name: string, raw: IRawPuzzle, setting: PuzzleSettings, objects: IPuzzleObjectContainer){
        this.name = name
        this.raw = raw
        this.settings = setting
        this.objects = objects
    }
}