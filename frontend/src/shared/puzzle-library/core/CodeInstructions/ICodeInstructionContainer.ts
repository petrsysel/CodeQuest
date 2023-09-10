interface ICodeInstructionContainer{
    instructions: ICodeInstruction[]
    add(instruction: ICodeInstruction):boolean
    clean():boolean
}