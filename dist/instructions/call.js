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
 * @name $call
 * @description Calls a function from the JavaScript context.
 * @returns {number}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)(/\$([A-z_](\.?[A-z_])*)\*/, true);
        this.identifier = (0, makeIdentifier_1.default)(this.patterns);
    }
    resolve({ inside, match }) {
        const tokens = inside ? [...this.transpiler.lexer.tokenize(inside)] : [];
        return new Nodes_1.CallNode({
            callee: new Nodes_1.LiteralNode(match[1]),
            parameters: new Nodes_1.OperatorNode({
                elements: this.transpiler.bulkNodify(tokens),
                operator: ', '
            }),
            zero: true
        });
    }
}
exports.default = default_1;
