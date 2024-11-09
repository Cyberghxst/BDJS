"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInstructions = void 0;
const collectFiles_1 = require("./collectFiles");
/**
 * Load instructions from the desired directory.
 * @param dir - Directory to load the instructions from.
 */
function loadInstructions(dir, callback) {
    const loaded = [];
    const collected = (0, collectFiles_1.collectFiles)(dir).sort((a, b) => b.name.length - a.name.length);
    for (const file of collected) {
        const data = require(file.dir).default;
        loaded.push(data);
    }
    callback(loaded);
}
exports.loadInstructions = loadInstructions;
