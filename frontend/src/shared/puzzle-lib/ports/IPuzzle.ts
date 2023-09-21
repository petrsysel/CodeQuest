interface IPuzzle{
    addObject(): PuzzleObjectId
    removeObject(id: PuzzleObjectId): boolean
    changeObjectSettings(id: PuzzleObjectId, settings: PuzzleObjectSettings): boolean
    changeSettings(settings: PuzzleSettings): boolean
    getSettings(): PuzzleSettings
    getObjectSettings(id: PuzzleObjectId): PuzzleObjectSettings | undefined
    getObjectList(): PuzzleObject[]
    getObject(id: PuzzleObjectId): PuzzleObject | undefined
}