import { Patterns } from "akore";

/**
 * Makes an instruction identifier.
 * @param patterns - Instruction patterns.
 * @returns {string}
 */
export default function(patterns: Patterns) {
    return 'bdjs:$' + patterns.foremost.source.replace('\\$', '')
}