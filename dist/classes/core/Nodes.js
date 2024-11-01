"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramNode = exports.CallbackNode = exports.KeyValueNode = exports.ArrayNode = exports.ControlFlowNode = exports.CallNode = exports.BlockNode = exports.AssignmentNode = exports.VariableDeclarationNode = exports.VariableDeclarationType = exports.OperatorNode = exports.LiteralNode = exports.BaseNode = exports.NodeType = void 0;
const akore_1 = require("akore");
/**
 * Represents a node type in the AST.
 */
var NodeType;
(function (NodeType) {
    NodeType["Program"] = "program";
    NodeType["Literal"] = "literal";
    NodeType["Operator"] = "operator";
    NodeType["Call"] = "call";
    NodeType["Assignment"] = "assignment";
    NodeType["ControlFlow"] = "control-flow";
    NodeType["Block"] = "block";
    NodeType["Condition"] = "condition";
    NodeType["KeyValue"] = "key-value";
    NodeType["VariableDeclaration"] = "variable-declaration";
    NodeType["Callback"] = "callback";
    NodeType["Array"] = "array";
})(NodeType || (exports.NodeType = NodeType = {}));
/**
 * Represents a base node in the AST.
 * @template Type The type of the node.
 * @template Value The value of the node.
 */
class BaseNode extends akore_1.Node {
    /**
     * Creates an instance of the BaseNode class.
     *
     * @param type The type of the node.
     * @param value The value of the node.
     * @param semicolon Indicates whether the node has a semicolon.
     */
    constructor(type, value, semicolon = false) {
        super(type, value);
        this.semicolon = semicolon;
    }
}
exports.BaseNode = BaseNode;
/**
 * Represents a literal node in the AST.
 */
class LiteralNode extends BaseNode {
    /**
     * Creates a new instance of the LiteralNode class.
     * @param value The value of the literal.
     * @param semicolon Indicates whether a semicolon should be added after the literal.
     */
    constructor(value, semicolon) {
        super(NodeType.Literal, value, semicolon);
    }
    /**
     * Serializes the literal node to a string representation.
     * @returns The string representation of the literal node.
     */
    serialize() {
        return this.value;
    }
}
exports.LiteralNode = LiteralNode;
/**
 * Represents an operator node in the AST.
 */
class OperatorNode extends BaseNode {
    /**
     * Creates a new instance of the OperatorNode class.
     * @param value The value of the operator node.
     * @param semicolon Indicates whether a semicolon should be added after the operator node.
     */
    constructor(value, semicolon) {
        super(NodeType.Operator, value, semicolon);
    }
    /**
     * Gets the elements contained in the operator node.
     */
    get elements() {
        return this.value.elements;
    }
    /**
     * Gets the operator string of the operator node.
     */
    get operator() {
        return this.value.operator;
    }
    /**
     * Serializes the operator node to a string representation.
     * @returns The serialized string representation of the operator node.
     */
    serialize() {
        return this.elements.map((node) => node.serialize()).join(this.value.operator);
    }
}
exports.OperatorNode = OperatorNode;
/**
 * The variable declaration type.
 */
var VariableDeclarationType;
(function (VariableDeclarationType) {
    VariableDeclarationType[VariableDeclarationType["Const"] = 0] = "Const";
    VariableDeclarationType[VariableDeclarationType["Let"] = 1] = "Let";
})(VariableDeclarationType || (exports.VariableDeclarationType = VariableDeclarationType = {}));
/**
 * Represents an assignment node in the AST.
 * @template Left The type of the left side of the assignment node.
 * @template Right The type of the right side of the assignment node.
 */
class VariableDeclarationNode extends OperatorNode {
    /**
     * Creates a new instance of the VariableDeclarationNode class.
     * @param left The left side of the declaration node.
     * @param right The right side of the declaration node.
     */
    constructor(type, left, right) {
        super({
            elements: [
                new LiteralNode(type === VariableDeclarationType.Const ? 'const' : 'let'),
                new OperatorNode({ elements: [left, right], operator: ' = ' })
            ],
            operator: ' '
        }, false);
    }
    /**
     * Gets the left side of the declaration node.
     * @returns The left side of the declaration node.
     */
    get left() {
        return this.elements[0];
    }
    /**
     * Gets the right side of the declaration node.
     * @returns The right side of the declaration node.
     */
    get right() {
        return this.elements[1];
    }
    /**
     * Serializes the declaration node to a string representation.
     * @returns The serialized string representation of the declaration node.
     */
    serialize() {
        return super.serialize();
    }
}
exports.VariableDeclarationNode = VariableDeclarationNode;
/**
 * Represents an assignment node in the AST.
 * @template Left The type of the left side of the assignment node.
 * @template Right The type of the right side of the assignment node.
 */
class AssignmentNode extends OperatorNode {
    /**
     * Creates a new instance of the AssignmentNode class.
     * @param left The left side of the assignment node.
     * @param right The right side of the assignment node.
     */
    constructor(left, right) {
        super({ elements: [left, right], operator: ' = ' }, false);
    }
    /**
     * Gets the left side of the assignment node.
     * @returns The left side of the assignment node.
     */
    get left() {
        return this.elements[0];
    }
    /**
     * Gets the right side of the assignment node.
     * @returns The right side of the assignment node.
     */
    get right() {
        return this.elements[1];
    }
    /**
     * Serializes the assignment node to a string representation.
     * @returns The serialized string representation of the assignment node.
     */
    serialize() {
        return super.serialize();
    }
}
exports.AssignmentNode = AssignmentNode;
/**
 * Represents a block node in the AST.
 */
class BlockNode extends BaseNode {
    /**
     * Creates a new instance of the BlockNode class.
     * @param nodes The nodes contained in the block.
     * @param semicolon Indicates whether a semicolon should be added after the block.
     */
    constructor(nodes, semicolon) {
        super(NodeType.Block, nodes, semicolon);
    }
    /**
     * Adds a node to the beginning of the block.
     * @param node The node to add.
     */
    unshift(node) {
        this.value.unshift(node);
    }
    /**
     * Adds a node to the end of the block.
     * @param node The node to add.
     */
    push(node) {
        this.value.push(node);
    }
    /**
     * Gets the nodes contained in the block.
     */
    get nodes() {
        return this.value;
    }
    /**
     * Serializes the block node to a string representation.
     * @returns The serialized string representation of the block node.
     */
    serialize() {
        return `{ ${this.nodes.map((node) => node.serialize()).join('\n')} }`;
    }
}
exports.BlockNode = BlockNode;
/**
 * Represents a call node in the AST.
 */
class CallNode extends BaseNode {
    /**
     * Creates a new instance of the CallNode class.
     * @param value The value of the call node.
     * @param semicolon Indicates whether a semicolon should be added after the call node.
     */
    constructor(value, semicolon) {
        super(NodeType.Call, value, semicolon);
    }
    /**
     * Gets the parameters of the call node.
     */
    get parameters() {
        return this.value.parameters;
    }
    /**
     * Gets the callee of the call node.
     */
    get callee() {
        return this.value.callee;
    }
    /**
     * Gets whether the call node has zero value.
     */
    get zero() {
        return this.value.zero;
    }
    /**
     * Serializes the call node to a string representation.
     * @returns The serialized string representation of the call node.
     */
    serialize() {
        const callee = this.zero ? `(0, ${this.callee.serialize()})` : this.callee.serialize(), parameters = this.parameters.serialize();
        return `${callee}(${parameters})`;
    }
}
exports.CallNode = CallNode;
/**
 * Represents a control flow node in the AST.
 */
class ControlFlowNode extends BaseNode {
    /**
     * Creates a new instance of the ControlFlowNode class.
     * @param value The value of the control flow node.
     * @param semicolon Indicates whether a semicolon should be added after the control flow node.
     */
    constructor(value, semicolon) {
        super(NodeType.ControlFlow, value, semicolon);
    }
    /**
     * Gets the indicator node of the control flow.
     */
    get indicator() {
        return this.value.indicator;
    }
    /**
     * Gets the consequent nodes of the control flow.
     */
    get consequent() {
        return this.value.consequent;
    }
    /**
     * Serializes the control flow node to a string representation.
     * @returns The serialized string representation of the control flow node.
     */
    serialize() {
        let result = this.indicator.serialize();
        for (const node of this.consequent) {
            result += ` ${node.serialize()}`;
        }
        return result;
    }
}
exports.ControlFlowNode = ControlFlowNode;
/**
 * Represents an array node in the AST.
 */
class ArrayNode extends BaseNode {
    /**
     * Creates a new instance of the ArrayNode class.
     * @param nodes The nodes contained in the array.
     * @param semicolon Indicates whether a semicolon should be added after the array.
     */
    constructor(nodes, semicolon) {
        super(NodeType.Array, nodes, semicolon);
    }
    /**
     * Adds a node to the beginning of the array.
     * @param node The node to add.
     */
    unshift(node) {
        this.value.unshift(node);
    }
    /**
     * Adds a node to the end of the array.
     * @param node The node to add.
     */
    push(node) {
        this.value.push(node);
    }
    /**
     * Gets the nodes contained in the array.
     */
    get nodes() {
        return this.value;
    }
    /**
     * Serializes the array node to a string representation.
     * @returns The serialized string representation of the array node.
     */
    serialize() {
        return `[${this.nodes.map((node) => node.serialize()).join(', ')}]`;
    }
}
exports.ArrayNode = ArrayNode;
/**
 * Represents a key-value node in the AST.
 */
class KeyValueNode extends BaseNode {
    /**
     * Creates a new instance of the KeyValueNode class.
     * @param nodes The nodes to be transformed to a key-value pair.
     * @param semicolon Whether add semicolon to the end.
     */
    constructor(nodes, semicolon = false) {
        super(NodeType.KeyValue, nodes, semicolon);
    }
    /**
     * Serializes this node to its string representation.
     * @returns {string}
     */
    serialize() {
        const all = new BlockNode(this.nodes.map((node) => new LiteralNode(`${node[0].serialize()}: ${node[1].serialize()},`)));
        return `${all.serialize()}`;
    }
    /**
     * Returns the children nodes contained in the key-value node.
     */
    get nodes() {
        return this.value;
    }
}
exports.KeyValueNode = KeyValueNode;
/**
 * Represents a callback node in the AST.
 */
class CallbackNode extends BaseNode {
    /**
     * Creates a new instance of the CallbackNode class.
     * @param value - The values to form this callback.
     */
    constructor(value) {
        super(NodeType.Callback, value, false);
    }
    serialize() {
        return `(${this.parameters.map(node => node.serialize()).join(', ')}) => ${this.consecuent.serialize()}`;
    }
    /**
     * Return the parameters of a callback.
     */
    get parameters() {
        return this.value.parameters;
    }
    /**
     * Returns the consecuent value of the callback.
     */
    get consecuent() {
        return this.value.consecuent;
    }
}
exports.CallbackNode = CallbackNode;
/**
 * Represents a program node in the AST.
 */
class ProgramNode extends BaseNode {
    /**
     * Creates a new instance of the ProgramNode class.
     * @param nodes The nodes contained in the program.
     */
    constructor(nodes) {
        super(NodeType.Program, nodes, false);
    }
    /**
     * Adds one or more nodes to the beginning of the program.
     * @param nodes The nodes to add to the program.
     */
    unshift(...nodes) {
        this.value.unshift(...nodes);
    }
    /**
     * Adds one or more nodes to the program.
     * @param nodes The nodes to be added.
     */
    push(...nodes) {
        this.value.push(...nodes);
    }
    /**
     * Gets the nodes of the program.
     * @returns An array of BaseNode objects.
     */
    get nodes() {
        return this.value;
    }
    /**
     * Serializes the program node and its child nodes into a string representation.
     * @returns The serialized string representation of the program node.
     */
    serialize() {
        return this.nodes.map((node) => {
            const serialized = node.serialize();
            return node.semicolon ? `${serialized};` : serialized;
        }).join('\n');
    }
}
exports.ProgramNode = ProgramNode;
