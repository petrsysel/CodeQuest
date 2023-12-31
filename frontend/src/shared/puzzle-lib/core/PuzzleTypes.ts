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
    Y: number,
    costume: CostumeData,
    visible: boolean
}

type PuzzlePrimitive = {
    id: PuzzleId,
    version: number
    settings: PuzzleSettings,
    objects: PuzzleObject[]
}

type PuzzleSettings = {
    name: string,
    blocks:Block[],
    sideWidth: number
}

type CostumeData = {
    name: string,
    path: string,
    tags: string[]
}

type Block = {
    type: string,
    name: string,
    category: string
}