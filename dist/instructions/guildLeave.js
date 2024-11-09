"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes_1 = require("../classes/core/Nodes");
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
/**
 * @name $guildLeave
 * @description Force the client to leave a guild.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$guildLeave', true);
        this.description = 'Force the client to leave a guild.';
        this.params = [
            {
                name: 'Guild ID',
                description: 'The guild to leave.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            },
            {
                name: 'Code',
                description: 'Code to execute if the condition is true.',
                type: BaseInstruction_1.ReturnType.Unknown,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [guildId, then, elsee] = this.splitByDelimiter(inside);
        const thenTokens = [...this.transpiler.lexer.tokenize(then)];
        const elseTokens = [...this.transpiler.lexer.tokenize(elsee)];
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(guildId)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('leave()'),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('then'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            new Nodes_1.CallbackNode({
                                parameters: [new Nodes_1.LiteralNode('guild')],
                                consecuent: new Nodes_1.BlockNode(this.transpiler.bulkNodify(thenTokens))
                            })
                        ],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('catch'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            new Nodes_1.CallbackNode({
                                parameters: [new Nodes_1.LiteralNode('err')],
                                consecuent: new Nodes_1.BlockNode(this.transpiler.bulkNodify(elseTokens))
                            })
                        ],
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
