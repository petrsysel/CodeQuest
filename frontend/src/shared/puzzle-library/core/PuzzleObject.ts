class PuzzleObject implements IPuzzleObject{
    data: IPuzzleObjectData;
    instructions: ICodeInstructionContainer;

    constructor(data: IPuzzleObjectData, instructions: CodeInstructionContainer){
        this.data = data
        this.instructions = instructions
    }
}