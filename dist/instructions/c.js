"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("@core/BaseInstruction");
const Nodes_1 = require("@core/Nodes");
const makeIdentifier_1 = __importDefault(require("@functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("@functions/makePattern"));
/**
 * @name $c
 * @description Adds a comment to the code.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$c', true);
        this.description = 'Adds a comment to the code.';
        this.params = [
            {
                name: 'Content',
                description: 'The content of the comment.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const tokens = [...this.transpiler.lexer.tokenize(inside)];
        const insideNodes = this.transpiler.bulkNodify(tokens);
        if (!/\$[a-zA-Z]/.test(inside)) {
            return new Nodes_1.LiteralNode(/\n/.test(inside) ? `/* ${inside} */` : `// ${inside}`);
        }
        else {
            return new Nodes_1.OperatorNode({
                elements: /\n/.test(inside) ? [
                    new Nodes_1.LiteralNode('/*'),
                    ...insideNodes,
                    new Nodes_1.LiteralNode('*/')
                ] : [
                    new Nodes_1.LiteralNode('//'),
                    ...insideNodes
                ],
                operator: ' '
            });
        }
    }
}
exports.default = default_1;
