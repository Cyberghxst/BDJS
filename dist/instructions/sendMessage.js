"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const Nodes_1 = require("../classes/core/Nodes");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
const createString_1 = __importDefault(require("../utils/functions/createString"));
/**
 * @name $sendMessage
 * @description Sends a message to the given channel.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$sendMessage', true);
        this.description = 'Sends a message to the given channel.';
        this.params = [
            {
                name: 'Channel ID',
                description: 'The channel to send the state to.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Content',
                description: 'The content to be sent.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Variable Name',
                description: 'Variable name to load the message ID to.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        let [rawChannelId, rawContent, variableName] = this.splitByDelimiter(inside);
        const program = new Nodes_1.ProgramNode([]);
        const hash = (0, createString_1.default)();
        program.push(new Nodes_1.LiteralNode(`let message_${hash}`, true));
        const contentTokens = this.transpiler.tokenize(rawContent);
        if (contentTokens.length > 0) {
            program.push(...this.transpiler.bulkNodify(contentTokens));
            for (const matchedToken of contentTokens) {
                let gotValue = matchedToken.match[0];
                if (matchedToken.inside) {
                    gotValue += `[${matchedToken.inside}]`;
                }
                rawContent = rawContent.replace(gotValue, '');
            }
        }
        rawContent = rawContent.trim(); // Trim the content.
        if (rawContent !== '') {
            program.push(new Nodes_1.LiteralNode(`runtime.container.content = ${this.transpiler.resolveString(rawContent).serialize()}`));
        }
        program.push(new Nodes_1.AssignmentNode(new Nodes_1.LiteralNode(`message_${hash}`), new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('await runtime.client.channels.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(rawChannelId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('send'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [new Nodes_1.LiteralNode('runtime.container')],
                        operator: ', '
                    }),
                    zero: false
                })
            ],
            operator: '.'
        })), new Nodes_1.LiteralNode('runtime.container.reset()'));
        if (variableName) {
            program.push(new Nodes_1.CallNode({
                callee: new Nodes_1.LiteralNode('runtime.variables.set'),
                parameters: new Nodes_1.OperatorNode({
                    elements: [
                        this.transpiler.resolveString(variableName),
                        new Nodes_1.LiteralNode(`message_${hash}.id`)
                    ],
                    operator: ', '
                }),
                zero: false
            }));
        }
        return program;
    }
}
exports.default = default_1;
