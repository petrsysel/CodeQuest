type PuzzleObjectId = string
type PuzzleId = string

type PuzzleObject = {
    id: PuzzleObjectId
    settings: PuzzleObjectSettings
}

type PuzzleObjectSettings = {
    name: string,
    layer: number,
    playerEdit: boolean,
    code: string,
    direction: "up"|"right"|"down"|"left",
    X: number,
    Y: number
}

type PuzzlePrimitive = {
    id: PuzzleId,
    version: number
    settings: PuzzleSettings,
    objects: PuzzleObject[]
}

type PuzzleSettings = {
    name: string
    blocks:string[]
    sideWidth: number
}
