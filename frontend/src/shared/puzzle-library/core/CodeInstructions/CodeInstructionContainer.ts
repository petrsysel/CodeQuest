class CodeInstructionContainer implements ICodeInstructionContainer{
    instructions: ICodeInstruction[];

    constructor(){
        this.instructions = []
    }

    add(instruction: ICodeInstruction): boolean {
        this.instructions.push(instruction)
        return true
    }

    clean(): boolean {
        this.instructions.splice(0, this.instructions.length)
        return true
    }
}