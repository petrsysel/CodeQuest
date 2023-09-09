import { IPuzzle } from "../core/IPuzzle"
import { IRawPuzzle } from "./IRawPuzzle"

export interface IPuzzleParser{
    loadPuzzle(rawPuzzle: IRawPuzzle): IPuzzle
    parsePuzzle(puzzle: IPuzzle): IRawPuzzle
}