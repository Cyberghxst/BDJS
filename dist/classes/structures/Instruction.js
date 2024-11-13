"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruction = exports.FieldLevel = exports.DataType = void 0;
const types_1 = require("util/types");
/**
 * Represents a data type.
 */
var DataType;
(function (DataType) {
    DataType[DataType["String"] = 0] = "String";
    DataType[DataType["Number"] = 1] = "Number";
    DataType[DataType["Integer"] = 2] = "Integer";
    DataType[DataType["Enum"] = 3] = "Enum";
    DataType[DataType["Nullable"] = 4] = "Nullable";
    DataType[DataType["Boolean"] = 5] = "Boolean";
    DataType[DataType["Unknown"] = 6] = "Unknown";
})(DataType || (exports.DataType = DataType = {}));
/**
 * Represents the requirement level of a field.
 */
var FieldLevel;
(function (FieldLevel) {
    /**
     * No need for arguments to be provided.
     */
    FieldLevel[FieldLevel["None"] = 0] = "None";
    /**
     * Fieldument can be left empty.
     */
    FieldLevel[FieldLevel["Optional"] = 1] = "Optional";
    /**
     * Fieldument must be provided and required.
     */
    FieldLevel[FieldLevel["Required"] = 2] = "Required";
    /**
     * The argument must be included but can be empty.
     */
    FieldLevel[FieldLevel["Emptiable"] = 3] = "Emptiable";
    /**
     * The argument can be excluded and if excluded can be empty.
     */
    FieldLevel[FieldLevel["Vacantable"] = 4] = "Vacantable";
})(FieldLevel || (exports.FieldLevel = FieldLevel = {}));
/**
 * Represents an instruction.
 */
class Instruction {
    data;
    /**
     * Whether this instruction is async.
     */
    async;
    /**
     * Creates a new instance of the `Instruction` class.
     * @param data - The instruction metadata.
     * @returns {Instruction}
     */
    constructor(data) {
        this.data = data;
        this.async = (0, types_1.isAsyncFunction)(data.run);
    }
    /**
     * Returns the name of the instruction.
     * @returns {string}
     */
    get name() {
        return this.data.name;
    }
    /**
     * Returns the instruction executor.
     * @returns {InstructionExecutor<Brackets, T>}
     */
    get run() {
        return this.data.run;
    }
}
exports.Instruction = Instruction;
