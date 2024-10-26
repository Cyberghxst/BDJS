"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/**
 * Makes a foremost pattern for a BDJS instruction.
 * @param pattern - Pattern to be created.
 * @param brackets - Whether this function must have brackets.
 * @returns {Patterns}
 */
function default_1(pattern, brackets = false) {
    return {
        foremost: pattern instanceof RegExp
            ? pattern
            : new RegExp(pattern.startsWith("\\$")
                ? pattern
                : "\\$" + pattern.replace(/[^a-zA-Z]/, "")),
        opener: brackets ? /\[/ : undefined,
        closer: brackets ? /\]/ : undefined,
    };
}
