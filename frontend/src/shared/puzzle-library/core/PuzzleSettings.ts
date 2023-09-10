class PuzzleSettings implements IPuzzleSettings{
    boardData: IBoardData;
    blockLimit: number;

    constructor(boardData: IBoardData, blockLimit: number){
        this.boardData = boardData
        this.blockLimit = blockLimit
    }
}