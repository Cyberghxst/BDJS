/**
 * Return the condition operators.
 * @returns {BDJSOperatorTypes[]}
 */
export default function (): BDJSOperatorTypes[];
/**
 * All valid math condition operator types.
 */
export type BDJSMathOperatorTypes = '<=' | '>=' | '<' | '>';
/**
 * All valid logic condition operator types.
 */
export type BDJSLogicOperatorTypes = '!=' | '==';
/**
 * All valid condition operator types.
 */
export type BDJSOperatorTypes = BDJSMathOperatorTypes | BDJSLogicOperatorTypes;
