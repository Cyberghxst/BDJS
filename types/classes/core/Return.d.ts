export declare enum ReturnType {
    Error = 0,
    Success = 1,
    ReturnKeyword = 2,
    Statement = 3,
    Break = 4
}
/**
 * Represents an instruction return.
 */
export declare class Return<Type extends ReturnType = ReturnType, Content = unknown> {
    private type;
    content: Content;
    /**
     * Creates a new instance of the `Return` class.
     * @param type - The type of return.
     * @param content - The content to return.
     * @returns {Return}
     */
    constructor(type: Type, content: Content);
    /**
     * @template T
     * Creates an string return.
     * @param data - The string to return.
     * @returns {Return<T>}
     */
    static string<T>(data: T): Return<ReturnType.Success, string>;
    /**
     * @template T
     * Creates a success return.
     * @param data - The value to return.
     * @returns {Return<T>}
     */
    static success<T>(data?: T): Return<ReturnType.Success, T | undefined>;
    /**
     * @template T
     * Creates an error return.
     * @param data - The value to return.
     * @returns {Return<T>}
     */
    static error<T>(data?: T): Return<ReturnType.Error, T | undefined>;
    /**
     * Whether this is a break statement.
     * @returns {this is Return<ReturnType.Break, null>}
     */
    isBreakStatement(): this is Return<ReturnType.Break, null>;
    /**
     * Whether this is an error.
     * @returns {this is Return<ReturnType.Error, string>}
     */
    isError(): this is Return<ReturnType.Error, string>;
    /**
     * Whether this is an statement error.
     * @returns {this is Return<ReturnType.Statement, string>}
     */
    isErrorStatement(): this is Return<ReturnType.Statement, string>;
    /**
     * Whether this is any error.
     * @returns {this is Return<ReturnType.Statement | ReturnType.Error, string>}
     */
    isAnyError(): this is Return<ReturnType.Statement | ReturnType.Error, string>;
    /**
     * Whether this is a success return.
     * @returns {this is Return<ReturnType.Success, Content>}
     */
    isSuccess(): this is Return<ReturnType.Success, Content>;
    /**
     * Whether this is a keyword return.
     * @returns {this is Return<ReturnType.ReturnKeyword, string>}
     */
    isReturnKeyword(): this is Return<ReturnType.ReturnKeyword, string>;
}
