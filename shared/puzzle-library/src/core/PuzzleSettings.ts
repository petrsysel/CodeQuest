import { IPuzzleSettings } from "./IPuzzleSettings";
import { IBoardData } from "./IBoardData";
import { DefaultBoardData } from "./DefaultBoardData";


export class PuzzleSettings implements IPuzzleSettings{
    boardData: IBoardData;

    constructor(){
        this.boardData = new DefaultBoardData()
    }
}