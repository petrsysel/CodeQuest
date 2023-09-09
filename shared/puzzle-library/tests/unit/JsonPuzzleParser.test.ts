import { BoardData } from "../../src/core/BoardData"
import { Puzzle } from "../../src/core/Puzzle"
import { PuzzleObjectContainer } from "../../src/core/PuzzleObjectContainer"
import { PuzzleSettings } from "../../src/core/PuzzleSettings"
import { PuzzleObject } from "../../src/core/PuzzleObject"
import { PuzzleObjectData } from "../../src/core/PuzzleObjectData"
import { CodeInstructionContainer } from "../../src/core/CodeInstructions/CodeInstructionContainer"
// import { CodeInstruction } from "../../src/core/CodeInstructions/CodeInstruction"
import * as utils from "@utils"
import { SampleCodeInstruction } from "../core/CodeInstructions/SampleCodeInstruction"
import { JsonPuzzle } from "../adapters/JsonPuzzle"
import { JsonPuzzleParser } from "../adapters/JsonPuzzleParser"
// import { CodeInstructionContainer } from "../../"

test("json puzzle parsing", () => {
    let jsonParser = new JsonPuzzleParser()
    let puzzle = createTestPuzzle()
    let raw = jsonParser.parsePuzzle(puzzle)
    console.log(raw.data)

    expect(4+4).toBe(8)     //MUSÍŠ POUŽÍT DVA TSCONFIG.JSON SOUBORY
})

function createTestPuzzle(){
    let boardData = new BoardData(30, 20)
    let puzzleSettings = new PuzzleSettings(boardData, 8)
    let objectContainer = new PuzzleObjectContainer()
    let puzzleObjectData = new PuzzleObjectData(new utils.Vector2(3,6))
    let instructionContainer = new CodeInstructionContainer()

    instructionContainer.add(new SampleCodeInstruction())
    instructionContainer.add(new SampleCodeInstruction())
    instructionContainer.add(new SampleCodeInstruction())
    instructionContainer.add(new SampleCodeInstruction())

    objectContainer.add(new PuzzleObject(puzzleObjectData, instructionContainer))

    let jsonPuzzle = new JsonPuzzle("no raw data")

    let puzzle = new Puzzle("test puzzle", jsonPuzzle, puzzleSettings, objectContainer)

    return puzzle
}