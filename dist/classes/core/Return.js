"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Return = exports.ReturnType = void 0;
const util_1 = require("util");
var ReturnType;
(function (ReturnType) {
    ReturnType[ReturnType["Error"] = 0] = "Error";
    ReturnType[ReturnType["Success"] = 1] = "Success";
    ReturnType[ReturnType["ReturnKeyword"] = 2] = "ReturnKeyword";
    ReturnType[ReturnType["Statement"] = 3] = "Statement";
    ReturnType[ReturnType["Break"] = 4] = "Break";
})(ReturnType || (exports.ReturnType = ReturnType = {}));
/**
 * Represents an instruction return.
 */
class Return {
    type;
    content;
    /**
     * Creates a new instance of the `Return` class.
     * @param type - The type of return.
     * @param content - The content to return.
     * @returns {Return}
     */
    constructor(type, content) {
        this.type = type;
        this.content = content;
    }
    /**
     * @template T
     * Creates an string return.
     * @param data - The string to return.
     * @returns {Return<T>}
     */
    static string(data) {
        let result = '';
        switch (typeof data) {
            case 'undefined': {
                result = '';
                break;
            }
            case 'boolean': {
                result = String(data);
                break;
            }
            case 'bigint': {
                result = data.toString();
                break;
            }
            case 'object': {
                result = data === null ? '' : (0, util_1.inspect)(data, { depth: 0 });
                break;
            }
            case 'function': {
                result = data.toString();
                break;
            }
        }
        return new Return(ReturnType.Success, result);
    }
    /**
     * @template T
     * Creates a success return.
     * @param data - The value to return.
     * @returns {Return<T>}
     */
    static success(data) {
        return new Return(ReturnType.Success, data);
    }
    /**
     * @template T
     * Creates an error return.
     * @param data - The value to return.
     * @returns {Return<T>}
     */
    static error(data) {
        return new Return(ReturnType.Error, data);
    }
    /**
     * Whether this is a break statement.
     * @returns {this is Return<ReturnType.Break, null>}
     */
    isBreakStatement() {
        return this.type === ReturnType.Break;
    }
    /**
     * Whether this is an error.
     * @returns {this is Return<ReturnType.Error, string>}
     */
    isError() {
        return this.type === ReturnType.Error;
    }
    /**
     * Whether this is an statement error.
     * @returns {this is Return<ReturnType.Statement, string>}
     */
    isErrorStatement() {
        return this.type === ReturnType.Statement;
    }
    /**
     * Whether this is any error.
     * @returns {this is Return<ReturnType.Statement | ReturnType.Error, string>}
     */
    isAnyError() {
        return this.isError() || this.isErrorStatement();
    }
    /**
     * Whether this is a success return.
     * @returns {this is Return<ReturnType.Success, Content>}
     */
    isSuccess() {
        return this.type === ReturnType.Success;
    }
    /**
     * Whether this is a keyword return.
     * @returns {this is Return<ReturnType.ReturnKeyword, string>}
     */
    isReturnKeyword() {
        return this.type === ReturnType.ReturnKeyword;
    }
}
exports.Return = Return;
