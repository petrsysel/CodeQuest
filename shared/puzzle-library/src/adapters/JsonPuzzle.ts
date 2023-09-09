import { IRawPuzzle } from "../ports/IRawPuzzle";

export class JsonPuzzle implements IRawPuzzle{
    data: string;

    constructor(data: string){
        this.data = data
    }

    asObject(): any {
        let parsed = {}
        try{
            parsed = JSON.parse(this.data)
        }
        catch(e){
            parsed = {}
        }
        
        return parsed
    }
}