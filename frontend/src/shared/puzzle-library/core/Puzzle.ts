class Puzzle implements IPuzzle{
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