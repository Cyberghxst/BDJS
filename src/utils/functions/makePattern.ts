import { Patterns } from "akore";

/**
 * Makes a foremost pattern for a BDJS instruction.
 * @param pattern - Pattern to be created.
 * @param brackets - Whether this function must have brackets.
 * @returns {Patterns}
 */
export default function(pattern: RegExp | string, brackets = false): Patterns {
    return {
        foremost:
            pattern instanceof RegExp
                ? pattern
                : new RegExp(
                    pattern.startsWith("\\$")
                        ? pattern
                        : "\\$" + pattern.replace(/[^a-zA-Z]/, "")
                ),
        opener: brackets ? /\[/ : undefined,
        closer: brackets ? /\]/ : undefined,
    };
}
