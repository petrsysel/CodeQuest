export type PuzzleObjectId = string
export type PuzzleId = string

export type PuzzleObject = {
    id: PuzzleObjectId
    settings: PuzzleObjectSettings
}

export type PuzzleObjectSettings = {
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

export type PuzzlePrimitive = {
    id: PuzzleId,
    version: number
    settings: PuzzleSettings,
    objects: PuzzleObject[]
}

export type PuzzleSettings = {
    name: string,
    blocks:Block[],
    sideWidth: number
}

export type CostumeData = {
    name: string,
    path: string,
    tags: string[]
}

export type Block = {
    type: string,
    name: string,
    category: string
}