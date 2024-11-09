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
 * @name $guildID
 * @description Returns the ID of the current guild.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$guildID', true);
        this.description = 'Returns the ID of the current guild.';
        this.params = [
            {
                name: 'Name',
                description: 'The name of the channel to get the ID from.',
                type: BaseInstruction_1.ReturnType.String,
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
            return new Nodes_1.LiteralNode('runtime.guild?.id');
        const [rawGuildName] = this.splitByDelimiter(inside);
        const guildName = this.transpiler.resolveString(rawGuildName);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.CallNode({
                    callee: new Nodes_1.LiteralNode('runtime.client.guilds.cache.get'),
                    parameters: new Nodes_1.OperatorNode({
                        elements: [new Nodes_1.LiteralNode(`g => g.name === ${guildName.serialize()}`)],
                        operator: ', '
                    }),
                    zero: false
                }),
                new Nodes_1.LiteralNode('id')
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
