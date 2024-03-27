import { BlocklyGenerator } from "../../../editor/adapters/UI/Blockly/BlocklyGenerator"
import { GameActor } from "../../../game/core/GameActor"
import { Puzzle } from "./Puzzle"
import { Block, CostumeData, PuzzleObject, PuzzlePrimitive } from "./PuzzleTypes"
import { v4 as uuidv4 } from 'uuid';

export class PuzzleUtils{
    static createPuzzle(): PuzzlePrimitive{
        return {
            id: uuidv4(),
            version: 1,
            settings:{
                name: "Nová úloha",
                sideWidth: 5,
                blocks: []
            },
            objects: []
        }
    }

    static createObject(number: number = 0): PuzzleObject{
        let sufix = number?` ${number}`: ''
        return {
            id: uuidv4(),
            settings:{
                name: `Nový objekt${sufix}`,
                layer: 1,
                playerEdit: false,
                code: "",
                direction: "down",
                X: 0,
                Y: 0,
                costume: this.getDefaultCostume(),
                visible: true
            }
        }
    }
    static duplicateObject(from: PuzzleObject): PuzzleObject{
        return {
            id: uuidv4(),
            settings:{
                name: from.settings.name,
                layer: from.settings.layer,
                playerEdit: from.settings.playerEdit,
                code: from.settings.code,
                direction: from.settings.direction,
                X: from.settings.X,
                Y: from.settings.Y,
                costume: from.settings.costume,
                visible: from.settings.visible
            }
        }
    }

    static getDefaultCostume(): CostumeData{
        return {
			name: "kouzelník",
			path: "./costumes/kouzelník.png",
			tags: ["fantasy", "kouzelník"]
		}
    }

    static toggleBlockType(blocks: Block[], block: Block): Block[]{
        let toggledBlocks = [...blocks]
        let index = toggledBlocks.findIndex(b => b.type == block.type)
        if(index !== -1){
            toggledBlocks.splice(index,1)
        }
        else{
            toggledBlocks.push(block)
        }
        return toggledBlocks
    }

    static toggleBlockCategory(blocks: Block[], allBlocks: Block[], category: String): Block[]{
        let categoryExists = blocks.some(b => b.category == category)
        
        if(categoryExists){
            return blocks.filter(b => b.category !== category)    
        }
        else{
            let newBlocks = allBlocks.filter(b => b.category == category)
            return [...blocks, ...newBlocks]
        }
    }
    static toggleBlockAll(blocks: Block[], allBlocks: Block[]): Block[]{
        if(blocks.length > 0){
            return []    
        }
        else{
            return [...allBlocks]
        }
    }

    static createActors(puzzle: Puzzle){
        let objects = puzzle.getObjectList().filter(o =>{
            let code = o.settings.code
            if(code != "" && code != "{}") return true
            else return false
        }).map(o => new GameActor(o, BlocklyGenerator.getCodeFor(o)))

        return objects
    }
    static stringifyActors(actors: GameActor[]){
        const stringActors = JSON.stringify(actors)
        return stringActors
    }
    static destringifyActors(stringActors: string){
        return JSON.parse(stringActors).map((sa:any) =>
            new GameActor(sa._primitive, sa._code)
        )
    }
}