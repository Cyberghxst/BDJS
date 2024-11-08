"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const Nodes_1 = require("../classes/core/Nodes");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
/**
 * @name $getInstruction
 * @description Gets information about an instruction.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$getInstruction', true);
        this.description = 'Gets information about an instruction.';
        this.params = [
            {
                name: 'Name',
                description: 'The name of the instruction to get.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [rawName, ...properties] = this.splitByDelimiter(inside);
        const name = this.transpiler.resolveString((rawName.startsWith('$') ? rawName : '$' + rawName).toLowerCase());
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.LiteralNode('runtime.normalizedInstructions()'),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('find'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            new Nodes_1.LiteralNode(`it => it.name.toLowerCase() === ${name.serialize()}`)
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                ...properties.map(v => new Nodes_1.LiteralNode(v))
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
