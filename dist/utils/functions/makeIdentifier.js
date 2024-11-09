"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Makes an instruction identifier.
 * @param fileName - Instruction file name.
 * @returns {string}
 */
function default_1(fileName) {
    return 'bdjs:$' + fileName.split('.')[0].split('\\').pop();
}
exports.default = default_1;
