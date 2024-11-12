import { InstructionThisArg as ThisArg } from '../core/ThisArg';
import type { Nullable } from '../../typings';
import type { Runtime } from './Runtime';
import { Return } from '../core/Return';
/**
 * Represents a data type.
 */
export declare enum DataType {
    String = 0,
    Number = 1,
    Integer = 2,
    Enum = 3,
    Nullable = 4,
    Boolean = 5,
    Unknown = 6
}
/**
 * Represents the requirement level of a field.
 */
export declare enum FieldLevel {
    /**
     * No need for arguments to be provided.
     */
    None = 0,
    /**
     * Argument can be left empty.
     */
    Optional = 1,
    /**
     * Argument must be provided and required.
     */
    Required = 2,
    /**
     * The argument must be included but can be empty.
     */
    Emptiable = 3,
    /**
     * The argument can be excluded and if excluded can be empty.
     */
    Vacantable = 4
}
/**
 * The structure representing a field data.
 */
export interface ArgData<Type extends DataType = DataType, Level extends FieldLevel = FieldLevel, Spread extends boolean = boolean, Enum = unknown> {
    /**
     * The name of this field.
     */
    name: string;
    /**
     * A brief description about this field.
     */
    description: string;
    /**
     * The type of this field.
     */
    type: Type;
    /**
     * Requirement level of this field.
     */
    level: Level;
    /**
     * The required enum of this field.
     */
    enum?: Enum;
    /**
     * Whether this field is spread.
     */
    spread: Spread;
}
/**
 * Tries to mark a value to null depending on the arg level.
 */
export type MarkNullable<Value, Level extends FieldLevel> = Level extends FieldLevel.Required ? Value : Level extends FieldLevel.Optional | FieldLevel.Vacantable | FieldLevel.Emptiable ? Nullable<Value> : Level extends FieldLevel.None ? unknown : never;
/**
 * Tries to mark a value as spread.
 */
export type MarkSpread<State extends boolean, Type> = State extends true ? Type[] : Type;
/**
 * Converts a value to its native type.
 */
export type ConvertArg<T extends DataType, Data> = T extends DataType.String ? string : T extends DataType.Integer ? number : T extends DataType.Enum ? keyof Data : T extends DataType.Nullable ? Nullable<Data> : T extends DataType.Unknown ? unknown : T extends DataType.Boolean ? boolean : never;
/**
 * Unwrap the instruction argument.
 */
export type UnwrapArg<T> = T extends ArgData<infer Type, infer Level, infer Spread, infer Enum> ? MarkSpread<Spread, MarkNullable<ConvertArg<Type, Enum>, Level>> : never;
/**
 * Unwrap various instruction arguments.
 */
export type UnwrapArgs<T> = T extends [infer L, ...infer R] ? [UnwrapArg<L>, ...UnwrapArgs<R>] : [];
/**
 * The instruction executor.
 */
export type InstructionExecutor<Brackets extends boolean = boolean, Args extends [...ArgData[]] = ArgData[]> = Brackets extends true ? (this: ThisArg, runtime: Runtime, ...args: UnwrapArgs<Args>) => Promise<Return> | Return : (this: ThisArg, runtime: Runtime) => Promise<Return> | Return;
/**
 * Structure representing an instruction.
 */
interface _Instruction<Args extends [...ArgData[]] = ArgData[], Brackets extends boolean = boolean, Compile extends boolean = boolean> {
    /**
     * The name this instruction has.
     */
    name: `$${string}`;
    /**
     * A brief description about this instruction.
     */
    description: string;
    /**
     * Whether this instruction has brackets.
     */
    brackets?: Brackets;
    /**
     * Whether this instruction must be executed at first evaluation.
     */
    compile: Compile;
    /**
     * The parameters this instruction requires.
     */
    params?: [...Args];
    /**
     * The executor of this instruction.
     */
    run: InstructionExecutor<Brackets, Args>;
}
/**
 * Represents an instruction.
 */
export declare class Instruction<T extends [...ArgData[]] = ArgData[], Brackets extends boolean = boolean, Compile extends boolean = boolean> {
    data: _Instruction<T, Brackets, Compile>;
    /**
     * Whether this instruction is async.
     */
    readonly async: boolean;
    /**
     * Creates a new instance of the `Instruction` class.
     * @param data - The instruction metadata.
     * @returns {Instruction}
     */
    constructor(data: _Instruction<T, Brackets, Compile>);
    /**
     * Returns the name of the instruction.
     * @returns {string}
     */
    get name(): `$${string}`;
    /**
     * Returns the instruction executor.
     * @returns {InstructionExecutor<Brackets, T>}
     */
    get run(): InstructionExecutor<Brackets, T>;
}
export {};
