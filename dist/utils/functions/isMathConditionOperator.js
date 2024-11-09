"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/**
 * Check whether the given operator is a math operator.
 * @param operator - Operator to be validated.
 * @returns {boolean}
 */
function default_1(operator) {
    return ['<=', '>=', '<', '>'].includes(operator);
}
