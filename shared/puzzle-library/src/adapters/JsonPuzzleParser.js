"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPuzzleParser = void 0;
var BoardData_1 = require("../core/BoardData");
var Puzzle_1 = require("../core/Puzzle");
var PuzzleObjectContainer_1 = require("../core/PuzzleObjectContainer");
var PuzzleSettings_1 = require("../core/PuzzleSettings");
var JsonPuzzle_1 = require("./JsonPuzzle");
var JsonPuzzleStructure_1 = require("./JsonPuzzleStructure");
var JsonPuzzleParser = /** @class */ (function () {
    function JsonPuzzleParser() {
    }
    JsonPuzzleParser.prototype.loadPuzzle = function (rawPuzzle) {
        var loadedPuzzle = rawPuzzle.asObject();
        var boardData = new BoardData_1.BoardData(0, 0); //konkrétní data budou načtena
        var settings = new PuzzleSettings_1.PuzzleSettings(boardData, 5);
        var objects = new PuzzleObjectContainer_1.PuzzleObjectContainer();
        var name = "new puzzle";
        var puzzle = new Puzzle_1.Puzzle(name, rawPuzzle, settings, objects);
        return puzzle;
        // nedokončeno
    };
    JsonPuzzleParser.prototype.parsePuzzle = function (puzzle) {
        var output = (0, JsonPuzzleStructure_1.initPuzzleStructure)();
        output.name = puzzle.name;
        output.settings.blockLimit = puzzle.settings.blockLimit;
        output.settings.board.width = puzzle.settings.boardData.width;
        output.settings.board.height = puzzle.settings.boardData.height;
        output.objects = [];
        puzzle.objects.objects.forEach(function (puzzleObject) {
            var puzzleInstructions = [];
            puzzleObject.instructions.instructions.forEach(function (instruction) {
                puzzleInstructions.push({
                    name: instruction.name,
                    description: instruction.description
                });
            });
            output.objects.push({
                data: {
                    x: puzzleObject.data.position.x,
                    y: puzzleObject.data.position.y
                },
                instructions: puzzleInstructions
            });
        });
        var stringifyed = JSON.stringify(output);
        var result = new JsonPuzzle_1.JsonPuzzle(stringifyed);
        return result;
    };
    return JsonPuzzleParser;
}());
exports.JsonPuzzleParser = JsonPuzzleParser;
