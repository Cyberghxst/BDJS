"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInstructions = loadInstructions;
const collectFiles_1 = require("./collectFiles");
/**
 * Load instructions from the desired directory.
 * @param dir - Directory to load the instructions from.
 */
function loadInstructions(dir, callback) {
    const loaded = [];
    const collected = (0, collectFiles_1.collectFiles)(dir);
    for (const file of collected) {
        const data = require(file.dir).default;
        loaded.push(data);
    }
    callback(loaded);
}
