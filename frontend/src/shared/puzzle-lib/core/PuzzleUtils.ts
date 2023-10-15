class PuzzleUtils{
    static createPuzzle(): PuzzlePrimitive{
        return {
            id: (crypto as any).randomUUID(),
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
            id: (crypto as any).randomUUID(),
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
            id: (crypto as any).randomUUID(),
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
			name: "Kouzelník",
			path: "/frontend/costumes/Kouzelník.png",
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
        })
        let actors: GameActor[] = []
        
        objects.forEach(object => {
            actors.push(new GameActor(object))
        })

        return actors
    }
}