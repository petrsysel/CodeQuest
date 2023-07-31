"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPuzzle = void 0;
var JsonPuzzle = /** @class */ (function () {
    function JsonPuzzle(data) {
        this.data = data;
    }
    JsonPuzzle.prototype.asObject = function () {
        var parsed = {};
        try {
            parsed = JSON.parse(this.data);
        }
        catch (e) {
            parsed = {};
        }
        return parsed;
    };
    return JsonPuzzle;
}());
exports.JsonPuzzle = JsonPuzzle;
