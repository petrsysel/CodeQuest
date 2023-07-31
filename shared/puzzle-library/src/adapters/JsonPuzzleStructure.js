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
var typeHelper = createStructure();
function initPuzzleStructure() {
    var output = createStructure();
    output.objects.splice(0, output.objects.length);
    return output;
}
exports.initPuzzleStructure = initPuzzleStructure;
