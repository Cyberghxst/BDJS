import { inspect } from "util"

export enum ReturnType {
    Error,
    Success,
    ReturnKeyword,
    Statement,
    Break
}

/**
 * Represents an instruction return.
 */
export class Return<Type extends ReturnType = ReturnType, Content = unknown> {
    /**
     * Creates a new instance of the `Return` class.
     * @param type - The type of return.
     * @param content - The content to return.
     * @returns {Return}
     */
    constructor(private type: Type, private content: Content) {}

    /**
     * @template T
     * Creates an string return.
     * @param data - The string to return.
     * @returns {Return<T>}
     */
    static string<T>(data: T) {
        let result = ''
        switch (typeof data) {
            case 'undefined': {
                result = ''
                break
            }
            case 'boolean': {
                result = String(data)
                break
            }
            case 'bigint': {
                result = data.toString()
                break
            }
            case 'object': {
                result = data === null ? '' : inspect(data, { depth: 0 })
                break
            }
            case 'function': {
                result = data.toString()
                break
            }
        }

        return new Return(ReturnType.Success, result)
    }

    /**
     * @template T
     * Creates a success return.
     * @param data - The value to return.
     * @returns {Return<T>}
     */
    static success<T>(data?: T) {
        return new Return(ReturnType.Success, data)
    }

    /**
     * @template T
     * Creates an error return.
     * @param data - The value to return.
     * @returns {Return<T>}
     */
    static error<T>(data?: T) {
        return new Return(ReturnType.Error, data)
    }

    /**
     * Whether this is a break statement.
     * @returns {this is Return<ReturnType.Break, null>}
     */
    isBreakStatement(): this is Return<ReturnType.Break, null> {
        return this.type === ReturnType.Break
    }

    /**
     * Whether this is an error.
     * @returns {this is Return<ReturnType.Error, string>}
     */
    isError(): this is Return<ReturnType.Error, string> {
        return this.type === ReturnType.Error
    }

    /**
     * Whether this is an statement error.
     * @returns {this is Return<ReturnType.Statement, string>}
     */
    isErrorStatement(): this is Return<ReturnType.Statement, string> {
        return this.type === ReturnType.Statement
    }

    /**
     * Whether this is any error.
     * @returns {this is Return<ReturnType.Statement | ReturnType.Error, string>}
     */
    isAnyError(): this is Return<ReturnType.Statement | ReturnType.Error, string> {
        return this.isError() || this.isErrorStatement()
    }

    /**
     * Whether this is a success return.
     * @returns {this is Return<ReturnType.Success, Content>}
     */
    isSuccess(): this is Return<ReturnType.Success, Content> {
        return this.type === ReturnType.Success
    }

    /**
     * Whether this is a keyword return.
     * @returns {this is Return<ReturnType.ReturnKeyword, string>}
     */
    isReturnKeyword(): this is Return<ReturnType.ReturnKeyword, string> {
        return this.type === ReturnType.ReturnKeyword
    }
}