import { InstructionThisArg as ThisArg } from '@core/Lexer'
import { isAsyncFunction } from 'util/types'
import type { Nullable } from '../../typings'
import type { Runtime } from './Runtime'
import { Return } from '@core/Return'

/**
 * Represents a data type.
 */
export enum DataType {
    String,
    Number,
    Integer,
    Enum,
    Nullable,
    Boolean,
    Unknown
}

/**
 * Represents the requirement level of a field.
 */
export enum FieldLevel {
    /**
     * No need for arguments to be provided.
     */
    None,
    /**
     * Fieldument can be left empty.
     */
    Optional,
    /**
     * Fieldument must be provided and required.
     */
    Required,
    /**
     * The argument must be included but can be empty.
     */
    Emptiable,
    /**
     * The argument can be excluded and if excluded can be empty.
     */
    Vacantable
}

/**
 * The structure representing a field data.
 */
export interface FieldData<Type extends DataType = DataType, Level extends FieldLevel = FieldLevel, Spread extends boolean = boolean, Enum = unknown> {
    /**
     * The name of this 
     * field.
     */
    name: string
    /**
     * A brief description about this field.
     */
    description: string
    /**
     * The type of this field.
     */
    type: Type
    /**
     * Requirement level of this field.
     */
    level: Level
    /**
     * The required enum of this field.
     */
    enum?: Enum
    /**
     * Whether this field is spread.
     */
    spread: Spread
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
export type ConvertField<T extends DataType, Data> = T extends DataType.String ? string : T extends DataType.Integer ? number : T extends DataType.Enum ? keyof Data : T extends DataType.Nullable ? Nullable<Data> : T extends DataType.Unknown ? unknown : T extends DataType.Boolean ? boolean : never;

/**
 * Unwrap the instruction argument.
 */
export type UnwrapField<T> = T extends FieldData<infer Type, infer Level, infer Spread, infer Enum> ? MarkSpread<Spread, MarkNullable<ConvertField<Type, Enum>, Level>> : never;

/**
 * Unwrap various instruction arguments.
 */
export type UnwrapFields<T> = T extends [infer L, ...infer R] ? [UnwrapField<L>, ...UnwrapFields<R>] : []

/**
 * The instruction executor.
 */
export type InstructionExecutor<Brackets extends boolean = boolean, Fields extends [...FieldData[]] = FieldData[]> = Brackets extends true ? (this: ThisArg, runtime: Runtime, ...args: UnwrapFields<Fields>) => Promise<Return> | Return : (this: ThisArg, runtime: Runtime) => Promise<Return> | Return

/**
 * Structure representing an instruction.
 */
interface _Instruction<Fields extends [...FieldData[]] = FieldData[], Brackets extends boolean = boolean, Compile extends boolean = boolean> {
    /**
     * The name this instruction has.
     */
    name: `$${string}`
    /**
     * A brief description about this instruction.
     */
    description: string
    /**
     * Whether this instruction has brackets.
     */
    brackets?: Brackets
    /**
     * Whether this instruction must be executed at first evaluation.
     */
    compile: Compile
    /**
     * The parameters this instruction requires.
     */
    fields?: [...Fields]
    /**
     * The executor of this instruction.
     */
    run: InstructionExecutor<Brackets, Fields>
}

/**
 * Represents an instruction.
 */
export class Instruction<T extends [...FieldData[]] = FieldData[], Brackets extends boolean = boolean, Compile extends boolean = boolean> {
    /**
     * Whether this instruction is async.
     */
    public readonly async: boolean

    /**
     * Creates a new instance of the `Instruction` class.
     * @param data - The instruction metadata.
     * @returns {Instruction}
     */
    constructor(public data: _Instruction<T, Brackets, Compile>) {
        this.async = isAsyncFunction(data.run)
    }

    /**
     * Returns the name of the instruction.
     * @returns {string}
     */
    public get name() {
        return this.data.name
    }

    /**
     * Returns the instruction executor.
     * @returns {InstructionExecutor<Brackets, T>}
     */
    public get run() {
        return this.data.run
    }
}