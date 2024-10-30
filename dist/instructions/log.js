"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const Nodes_1 = require("../classes/core/Nodes");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
const akore_1 = require("akore");
/**
 * @name $log
 * @description Logs a message into the console.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$log', true);
        this.description = 'Logs a message into the console.';
        this.params = [
            {
                name: 'Message',
                description: 'The message to log in the console.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: true,
                spread: false
            }
        ];
        this.flags = akore_1.LexicalFlags.UNSTOPPABLE;
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode('console.log'),
            parameters: new Nodes_1.OperatorNode({
                elements: [this.transpiler.resolveString(inside)],
                operator: ', '
            }),
            zero: false
        });
    }
}
exports.default = default_1;
