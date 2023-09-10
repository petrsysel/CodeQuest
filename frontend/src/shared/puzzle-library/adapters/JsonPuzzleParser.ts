class JsonPuzzleParser implements IPuzzleParser{
    loadPuzzle(rawPuzzle: JsonPuzzle): IPuzzle {
        let loadedPuzzle = rawPuzzle.asObject()

        let boardData = new BoardData(0,0)  //konkrétní data budou načtena
        let settings = new PuzzleSettings(boardData, 5)
        let objects = new PuzzleObjectContainer()
        let name = "new puzzle"

        let puzzle = new Puzzle(name, rawPuzzle, settings, objects)

        return puzzle
        // nedokončeno
    }
    parsePuzzle(puzzle: Puzzle): JsonPuzzle {
        let output = initPuzzleStructure()
        
        output.name = puzzle.name

        output.settings.blockLimit = puzzle.settings.blockLimit
        output.settings.board.width = puzzle.settings.boardData.width
        output.settings.board.height = puzzle.settings.boardData.height

        output.objects = []
        puzzle.objects.objects.forEach(puzzleObject => {
            let puzzleInstructions: {name:string, description: string}[] = []
            puzzleObject.instructions.instructions.forEach(instruction => {
                puzzleInstructions.push({
                    name: instruction.name,
                    description: instruction.description
                })
            })
            output.objects.push({
                data:{
                    x:puzzleObject.data.position.x,
                    y:puzzleObject.data.position.y
                },
                instructions: puzzleInstructions
            })
        })
        
        let stringifyed = JSON.stringify(output)
        let result = new JsonPuzzle(stringifyed)
        return result
    }
}