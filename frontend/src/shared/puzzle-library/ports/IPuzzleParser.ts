interface IPuzzleParser{
    loadPuzzle(rawPuzzle: IRawPuzzle): IPuzzle
    parsePuzzle(puzzle: IPuzzle): IRawPuzzle
}