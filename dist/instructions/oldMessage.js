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
 * @name $oldMessage
 * @description Retrieves an old message data.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$oldMessage', true);
        this.description = 'Retrieves an old channel data.';
        this.params = [
            {
                name: 'Property',
                description: 'Property to be accesed.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: true
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [...properties] = this.splitByDelimiter(inside);
        return new Nodes_1.OperatorNode({
            elements: [
                new Nodes_1.LiteralNode('runtime.states.message.old'),
                ...properties.map((value) => new Nodes_1.LiteralNode(value))
            ],
            operator: '.'
        });
    }
}
exports.default = default_1;
