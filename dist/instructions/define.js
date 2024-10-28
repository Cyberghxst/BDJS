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
 * @name $define
 * @description Creates a runtime variable.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$define', true);
        this.description = 'Creates a runtime variable.';
        this.params = [
            {
                name: 'Name',
                description: 'The name of the variable.',
                type: BaseInstruction_1.ReturnType.String,
                required: true,
                spread: false
            }
        ];
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Unknown;
        this.version = '2.0.0';
    }
    resolve({ inside = '' }) {
        const [name] = this.splitByDelimiter(inside);
        return new Nodes_1.VariableDeclarationNode(Nodes_1.VariableDeclarationType.Let, new Nodes_1.LiteralNode(name), this.transpiler.resolveString(''));
    }
}
exports.default = default_1;
