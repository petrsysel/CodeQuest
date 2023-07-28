import { IRawPuzzle } from "../ports/IRawPuzzle";
import { IPuzzle } from "./IPuzzle";
import { IPuzzleObjectContainer } from "./IPuzzleObjectContainer";
import { IPuzzleSettings } from "./IPuzzleSettings";
import { PuzzleObjectContainer } from "./PuzzleObjectContainer";
import { PuzzleSettings } from "./PuzzleSettings";

export class Puzzle implements IPuzzle{
    raw: IRawPuzzle
    settings: IPuzzleSettings;
    objects: IPuzzleObjectContainer;

    constructor(raw: IRawPuzzle){
        this.raw = raw
        this.settings = new PuzzleSettings()
        this.objects = new PuzzleObjectContainer()
    }
}