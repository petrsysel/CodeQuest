import { ICodeInstructionContainer } from "./CodeInstructions/ICodeInstructionContainer";
import { IPuzzleObjectData } from "./IPuzzleObjectData";

export interface IPuzzleObject{
    data: IPuzzleObjectData
    instructions: ICodeInstructionContainer
}