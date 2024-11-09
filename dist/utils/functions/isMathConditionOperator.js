"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check whether the given operator is a math operator.
 * @param operator - Operator to be validated.
 * @returns {boolean}
 */
function default_1(operator) {
    return ['<=', '>=', '<', '>'].includes(operator);
}
exports.default = default_1;
