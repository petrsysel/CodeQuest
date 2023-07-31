import { CodeInstructionContainer } from "./CodeInstructions/CodeInstructionContainer";
import { ICodeInstructionContainer } from "./CodeInstructions/ICodeInstructionContainer";
import { IPuzzleObject } from "./IPuzzleObject";
import { IPuzzleObjectData } from "./IPuzzleObjectData";
import { PuzzleObjectContainer } from "./PuzzleObjectContainer";

export class PuzzleObject implements IPuzzleObject{
    data: IPuzzleObjectData;
    instructions: ICodeInstructionContainer;

    constructor(data: IPuzzleObjectData, instructions: CodeInstructionContainer){
        this.data = data
        this.instructions = instructions
    }
}