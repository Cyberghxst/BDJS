"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseInstruction_1 = require("../classes/core/BaseInstruction");
const makeIdentifier_1 = __importDefault(require("../utils/functions/makeIdentifier"));
const makePattern_1 = __importDefault(require("../utils/functions/makePattern"));
const Nodes_1 = require("../classes/core/Nodes");
/**
 * @name $clientID
 * @description Returns the ID of the client.
 * @returns {string}
 */
class default_1 extends BaseInstruction_1.BaseInstruction {
    constructor() {
        super(...arguments);
        this.patterns = (0, makePattern_1.default)('$clientID');
        this.description = 'Returns the ID of the client.';
        this.identifier = (0, makeIdentifier_1.default)(__filename);
        this.returnType = BaseInstruction_1.ReturnType.String;
        this.version = '2.0.0';
    }
    resolve() {
        return new Nodes_1.LiteralNode('runtime.client.user.id');
    }
}
exports.default = default_1;
