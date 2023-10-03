class PuzzleUtils{
    static createPuzzle(): PuzzlePrimitive{
        return {
            id: (crypto as any).randomUUID(),
            version: 1,
            settings:{
                name: "Nová Úloha",
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
                costume: this.getDefaultCostume()
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
}