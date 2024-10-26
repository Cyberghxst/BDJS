/**
 * Check whether the given operator is a math operator.
 * @param operator - Operator to be validated.
 * @returns {boolean}
 */
export default function(operator: string) {
    return ['<=', '>=', '<', '>'].includes(operator)
}