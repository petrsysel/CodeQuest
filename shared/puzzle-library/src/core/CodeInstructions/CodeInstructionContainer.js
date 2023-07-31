"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeInstructionContainer = void 0;
var CodeInstructionContainer = /** @class */ (function () {
    function CodeInstructionContainer() {
        this.instructions = [];
    }
    CodeInstructionContainer.prototype.add = function (instruction) {
        this.instructions.push(instruction);
        return true;
    };
    CodeInstructionContainer.prototype.clean = function () {
        this.instructions.splice(0, this.instructions.length);
        return true;
    };
    return CodeInstructionContainer;
}());
exports.CodeInstructionContainer = CodeInstructionContainer;
