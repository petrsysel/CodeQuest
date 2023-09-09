var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
// created from 'create-ts-index'
define("index", ["require", "exports", "./adapters", "./core", "./ports"], function (require, exports, adapters_1, core_1, ports_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(adapters_1, exports);
    __exportStar(core_1, exports);
    __exportStar(ports_1, exports);
});
define("ports/IRawPuzzle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("adapters/JsonPuzzle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonPuzzle = void 0;
    class JsonPuzzle {
        constructor(data) {
            this.data = data;
        }
        asObject() {
            let parsed = {};
            try {
                parsed = JSON.parse(this.data);
            }
            catch (e) {
                parsed = {};
            }
            return parsed;
        }
    }
    exports.JsonPuzzle = JsonPuzzle;
});
define("core/IBoardData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/BoardData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BoardData = void 0;
    class BoardData {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
    }
    exports.BoardData = BoardData;
});
define("core/CodeInstructions/ICodeInstruction", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/CodeInstructions/ICodeInstructionContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/IPuzzleObjectData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/IPuzzleObject", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/IPuzzleObjectContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/IPuzzleSettings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/IPuzzle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("core/PuzzleObjectContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PuzzleObjectContainer = void 0;
    class PuzzleObjectContainer {
        constructor() {
            this.objects = [];
        }
        add(puzzleObject) {
            this.objects.push(puzzleObject);
            return true;
        }
        count() {
            return this.objects.length;
        }
    }
    exports.PuzzleObjectContainer = PuzzleObjectContainer;
});
define("core/DefaultBoardData", ["require", "exports", "core/BoardData"], function (require, exports, BoardData_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DefaultBoardData = void 0;
    class DefaultBoardData extends BoardData_1.BoardData {
        constructor() {
            super(5, 5);
        }
    }
    exports.DefaultBoardData = DefaultBoardData;
});
define("core/PuzzleSettings", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PuzzleSettings = void 0;
    class PuzzleSettings {
        constructor(boardData, blockLimit) {
            this.boardData = boardData;
            this.blockLimit = blockLimit;
        }
    }
    exports.PuzzleSettings = PuzzleSettings;
});
define("core/Puzzle", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Puzzle = void 0;
    class Puzzle {
        constructor(name, raw, setting, objects) {
            this.name = name;
            this.raw = raw;
            this.settings = setting;
            this.objects = objects;
        }
    }
    exports.Puzzle = Puzzle;
});
define("ports/IPuzzleParser", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("adapters/JsonPuzzleStructure", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initPuzzleStructure = void 0;
    function createStructure() {
        return {
            name: "puzzle",
            settings: {
                board: {
                    width: 5,
                    height: 5
                },
                blockLimit: 5
            },
            objects: [
                {
                    data: {
                        x: 0,
                        y: 0
                    },
                    instructions: [
                        {
                            name: "instruction",
                            description: "instruction description"
                        }
                    ]
                }
            ]
        };
    }
    const typeHelper = createStructure();
    function initPuzzleStructure() {
        let output = createStructure();
        output.objects.splice(0, output.objects.length);
        return output;
    }
    exports.initPuzzleStructure = initPuzzleStructure;
});
define("adapters/JsonPuzzleParser", ["require", "exports", "core/BoardData", "core/Puzzle", "core/PuzzleObjectContainer", "core/PuzzleSettings", "adapters/JsonPuzzle", "adapters/JsonPuzzleStructure"], function (require, exports, BoardData_2, Puzzle_1, PuzzleObjectContainer_1, PuzzleSettings_1, JsonPuzzle_1, JsonPuzzleStructure_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.JsonPuzzleParser = void 0;
    class JsonPuzzleParser {
        loadPuzzle(rawPuzzle) {
            let loadedPuzzle = rawPuzzle.asObject();
            let boardData = new BoardData_2.BoardData(0, 0); //konkrétní data budou načtena
            let settings = new PuzzleSettings_1.PuzzleSettings(boardData, 5);
            let objects = new PuzzleObjectContainer_1.PuzzleObjectContainer();
            let name = "new puzzle";
            let puzzle = new Puzzle_1.Puzzle(name, rawPuzzle, settings, objects);
            return puzzle;
            // nedokončeno
        }
        parsePuzzle(puzzle) {
            let output = (0, JsonPuzzleStructure_1.initPuzzleStructure)();
            output.name = puzzle.name;
            output.settings.blockLimit = puzzle.settings.blockLimit;
            output.settings.board.width = puzzle.settings.boardData.width;
            output.settings.board.height = puzzle.settings.boardData.height;
            output.objects = [];
            puzzle.objects.objects.forEach(puzzleObject => {
                let puzzleInstructions = [];
                puzzleObject.instructions.instructions.forEach(instruction => {
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
            let stringifyed = JSON.stringify(output);
            let result = new JsonPuzzle_1.JsonPuzzle(stringifyed);
            return result;
        }
    }
    exports.JsonPuzzleParser = JsonPuzzleParser;
});
// created from 'create-ts-index'
define("adapters/index", ["require", "exports", "adapters/JsonPuzzle", "adapters/JsonPuzzleParser", "adapters/JsonPuzzleStructure"], function (require, exports, JsonPuzzle_2, JsonPuzzleParser_1, JsonPuzzleStructure_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(JsonPuzzle_2, exports);
    __exportStar(JsonPuzzleParser_1, exports);
    __exportStar(JsonPuzzleStructure_2, exports);
});
define("core/CodeInstructions/CodeInstructionContainer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeInstructionContainer = void 0;
    class CodeInstructionContainer {
        constructor() {
            this.instructions = [];
        }
        add(instruction) {
            this.instructions.push(instruction);
            return true;
        }
        clean() {
            this.instructions.splice(0, this.instructions.length);
            return true;
        }
    }
    exports.CodeInstructionContainer = CodeInstructionContainer;
});
define("core/PuzzleObject", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PuzzleObject = void 0;
    class PuzzleObject {
        constructor(data, instructions) {
            this.data = data;
            this.instructions = instructions;
        }
    }
    exports.PuzzleObject = PuzzleObject;
});
define("core/PuzzleObjectData", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PuzzleObjectData = void 0;
    class PuzzleObjectData {
        constructor(position) {
            this.position = position;
        }
    }
    exports.PuzzleObjectData = PuzzleObjectData;
});
// created from 'create-ts-index'
define("core/index", ["require", "exports", "./CodeInstructions", "core/BoardData", "core/DefaultBoardData", "core/IBoardData", "core/IPuzzle", "core/IPuzzleObject", "core/IPuzzleObjectContainer", "core/IPuzzleObjectData", "core/IPuzzleSettings", "core/Puzzle", "core/PuzzleObject", "core/PuzzleObjectContainer", "core/PuzzleObjectData", "core/PuzzleSettings"], function (require, exports, CodeInstructions_1, BoardData_3, DefaultBoardData_1, IBoardData_1, IPuzzle_1, IPuzzleObject_1, IPuzzleObjectContainer_1, IPuzzleObjectData_1, IPuzzleSettings_1, Puzzle_2, PuzzleObject_1, PuzzleObjectContainer_2, PuzzleObjectData_1, PuzzleSettings_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(CodeInstructions_1, exports);
    __exportStar(BoardData_3, exports);
    __exportStar(DefaultBoardData_1, exports);
    __exportStar(IBoardData_1, exports);
    __exportStar(IPuzzle_1, exports);
    __exportStar(IPuzzleObject_1, exports);
    __exportStar(IPuzzleObjectContainer_1, exports);
    __exportStar(IPuzzleObjectData_1, exports);
    __exportStar(IPuzzleSettings_1, exports);
    __exportStar(Puzzle_2, exports);
    __exportStar(PuzzleObject_1, exports);
    __exportStar(PuzzleObjectContainer_2, exports);
    __exportStar(PuzzleObjectData_1, exports);
    __exportStar(PuzzleSettings_2, exports);
});
define("core/CodeInstructions/SampleCodeInstruction", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SampleCodeInstruction = void 0;
    class SampleCodeInstruction {
        constructor() {
            this.name = "sample";
            this.description = "a description";
        }
    }
    exports.SampleCodeInstruction = SampleCodeInstruction;
});
// created from 'create-ts-index'
define("core/CodeInstructions/index", ["require", "exports", "core/CodeInstructions/CodeInstructionContainer", "core/CodeInstructions/ICodeInstruction", "core/CodeInstructions/ICodeInstructionContainer", "core/CodeInstructions/SampleCodeInstruction"], function (require, exports, CodeInstructionContainer_1, ICodeInstruction_1, ICodeInstructionContainer_1, SampleCodeInstruction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(CodeInstructionContainer_1, exports);
    __exportStar(ICodeInstruction_1, exports);
    __exportStar(ICodeInstructionContainer_1, exports);
    __exportStar(SampleCodeInstruction_1, exports);
});
// created from 'create-ts-index'
define("ports/index", ["require", "exports", "ports/IPuzzleParser", "ports/IRawPuzzle"], function (require, exports, IPuzzleParser_1, IRawPuzzle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(IPuzzleParser_1, exports);
    __exportStar(IRawPuzzle_1, exports);
});
