"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/**
 * Makes an instruction identifier.
 * @param patterns - Instruction patterns.
 * @returns {string}
 */
function default_1(patterns) {
    return 'bdjs:$' + patterns.foremost.source.replace('\\$', '');
}
