"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes_1 = require("@core/Nodes");
const BaseInstruction_1 = require("@core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("@functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("@functions/makePattern"));
/**
 * @name $userBanner
 * @description Returns the banner URL of an user.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$userBanner', true);
        this.description = 'Returns the banner URL of an user.';
        this.params = [
            {
                name: 'User ID',
                description: 'The user ID to retrieve the banner from.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Size',
                description: 'The size of the banner.',
                type: BaseInstruction_1.ReturnType.Number,
                required: false,
                spread: false
            },
            {
                name: 'Extension',
                description: 'The extension of the image.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            },
            {
                name: 'Force Static',
                description: 'Whether force the image to be static.',
                type: BaseInstruction_1.ReturnType.Boolean,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside }) {
        if (!inside)
            return new Nodes_1.LiteralNode('runtime.user.bannerURL()');
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
                    callee: new Nodes_1.LiteralNode('bannerURL'),
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
