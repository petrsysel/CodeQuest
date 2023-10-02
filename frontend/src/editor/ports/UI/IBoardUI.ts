type BoardUIEvents = "object-selected"|"object-moved"
type BoardUIData = {
    objectId: PuzzleObjectId,
    x: number,
    y: number
}

interface IBoardUI {
    setSelected(objectId: PuzzleObjectId): void
    render(objects: PuzzleObject[]): void
    on(event: BoardUIEvents, callback: (data: BoardUIData) => void): void
}