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
 * @name $approximateMembersCount
 * @description Return the approximate members count of a given guild.
 * @returns {number}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$approximateMembersCount', true);
        this.description = 'Return the approximate members count of a given guild.';
        this.params = [
            {
                name: 'Guild ID',
                description: 'The ID of the guild to get the members from.',
                type: BaseInstruction_1.ReturnType.String,
                required: false,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Number;
        this.version = '2.0.0';
    }
    resolve({ inside }) {
        if (!inside)
            return new Nodes_1.LiteralNode('runtime.guild?.approximateMemberCount');
        const [rawGuildName] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [this.transpiler.resolveString(rawGuildName)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('approximateMemberCount')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
