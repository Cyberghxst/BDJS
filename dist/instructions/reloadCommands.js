"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("@core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("@functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("@functions/makePattern"));
const Nodes_1 = require("@core/Nodes");
/**
 * @name $reloadCommands
 * @description Reload the client commands.
 * @returns {unknown}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$reloadCommands');
        this.description = 'Reload the client commands.';
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.Boolean;
        this.version = '2.0.0';
    }
    resolve() {
        return new Nodes_1.LiteralNode('runtime.client.commands.reload()');
    }
}
exports.default = default_1;
