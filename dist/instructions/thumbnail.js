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
 * @name $thumbnail
 * @description Set the embed thumbnail.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$thumbnail', true);
        this.description = 'Set the embed thumbnail.';
        this.params = [
            {
                name: 'Text',
                description: 'The text to set as thumbnail.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Index',
                description: 'The embed index to set the thumbnail to.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [url, index] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.container.getEmbed'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            index !== undefined ? this.transpiler.resolveNumber(index) : new Nodes_1.LiteralNode('undefined')
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('setThumbnail'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(url)],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
