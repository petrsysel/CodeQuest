import { ICodeInstruction } from "./ICodeInstruction";

export class SampleCodeInstruction implements ICodeInstruction{
    name: string;
    description: string;

    constructor(){
        this.name = "sample"
        this.description = "a description"
    }
}