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
 * @name $userAvatar
 * @description Returns the token of the client.
 * @returns {number}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$userAvatar', true);
        this.identifier = (0, makeIdentifier_1.default)(__filename);
    }
    resolve({ inside }) {
        if (!inside) {
            return new Nodes_1.CallNode({
                callee: new Nodes_1.LiteralNode('runtime.user.displayAvatarURL'),
                parameters: new Nodes_1.OperatorNode({
                    elements: [
                        new Nodes_1.KeyValueNode([
                            [new Nodes_1.LiteralNode('forceStatic'), new Nodes_1.LiteralNode('true')],
                            [new Nodes_1.LiteralNode('size'), new Nodes_1.LiteralNode('1024')],
                            [new Nodes_1.LiteralNode('format'), this.transpiler.resolveString('png')]
                        ])
                    ],
                    operator: ''
                }),
                zero: false
            });
        }
        const [userId, size, extension, forceStatic] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.users.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(userId)],
                        operator: ''
                    }),
                    zero: false
                }),
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('displayAvatarURL'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [
                            new Nodes_1.KeyValueNode([
                                [new Nodes_1.LiteralNode('forceStatic'), new Nodes_1.LiteralNode(forceStatic !== undefined ? forceStatic : 'true')],
                                [new Nodes_1.LiteralNode('size'), this.transpiler.resolveNumber(size || '1024')],
                                [new Nodes_1.LiteralNode('format'), this.transpiler.resolveString(extension || 'png')]
                            ])
                        ],
                        operator: ''
                    }),
                    zero: false
                })
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;