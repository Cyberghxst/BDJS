import { Transpiler } from './Transpiler'
import { BaseCompetence } from 'akore'

export abstract class BaseInstruction extends BaseCompetence<Transpiler> {
    description?: string
    params?: IParamDef[]
    returnType?: ReturnType
    version?: `${number}.${number}.${number}` | string
}

/**
 * Represents the return type of a value.
 */
export enum ReturnType {
    Array,
    Bigint,
    Boolean,
    Number,
    Object,
    String,
    Unknown
}

/**
 * Represents the structure of a parameter definition.
 */
export interface IParamDef {
    /**
     * The name of this parameter.
     */
    name: string
    /**
     * A brief description about this parameter.
     */
    description: string
    /**
     * The return type of this parameter.
     */
    type: ReturnType
    /**
     * Whether this parameter is required.
     */
    required?: boolean
    /**
     * Whether this parameter is spread.
     */
    spread?: boolean
}