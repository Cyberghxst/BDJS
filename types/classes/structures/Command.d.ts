import { Runtime } from './Runtime';
import { InstructionToken } from '../core/Lexer';
/**
 * Command types that Discord contexts provide.
 */
export type DiscordCommandTypes = 'prefixed' | 'unprefixed' | 'alwaysReply' | 'messageDelete' | 'messageUpdate' | 'error' | 'ready' | 'anyInteraction' | 'modalInteraction' | 'buttonInteraction' | 'commandInteraction' | 'selectMenuInteraction' | 'userContextMenuInteraction' | 'messageContextMenuInteraction' | 'autocompleteInteraction' | 'memberJoin' | 'memberLeave' | 'memberUpdate' | 'reactionAdd' | 'reactionRemove' | 'reactionRemoveAll' | 'reactionRemoveEmoji' | 'stickerCreate' | 'stickerDelete' | 'stickerUpdate' | 'roleCreate' | 'roleDelete' | 'roleUpdate' | 'clientJoin' | 'clientLeave' | 'channelCreate' | 'channelDelete' | 'channelUpdate' | 'threadCreate' | 'threadDelete' | 'threadUpdate' | 'banAdd' | 'banRemove' | 'emojiCreate' | 'emojiDelete' | 'emojiUpdate' | 'auditLogEntryCreate' | 'presenceUpdate' | 'userUpdate' | 'automodRuleCreate' | 'automodRuleDelete' | 'automodRuleUpdate' | 'automodActionExecution' | 'entitlementCreate' | 'entitlementUpdate' | 'entitlementDelete' | 'typingStart';
/**
 * Custom command types that BDJS provides.
 */
export type CustomCommandTypes = 'timeout' | 'interval';
/**
 * All command types provided by the library.
 */
export type CommandTypes = DiscordCommandTypes | CustomCommandTypes;
/**
 * A command executor.
 */
export type CommandExecutor = (runtime: Runtime) => Promise<any> | any;
/**
 * The base interface of a command.
 */
export interface IRawCommand<Type extends string = string> {
    /**
     * The name this command has.
     */
    name?: string | RegExp;
    /**
     * Additional names this command can match.
     */
    aliases?: string[];
    /**
     * The type of this command.
     */
    type: Type;
    /**
     * The native code of this command.
     */
    code: string;
    /**
     * The transpiled code of the command.
     */
    compiled?: InstructionToken[] | null;
    /**
     * The path of this command.
     * If `null`, command was added from main file.
     * Otherwise, it was loaded using the command manager.
     */
    path: string | null;
    /**
     * Whether command should be minified.
     * @default true
     */
    minify?: boolean;
    /**
     * Whether send the result of the command evaluation.
     * @default false
     */
    sendResult?: boolean;
}
/**
 * A BDJS command.
 */
export interface BDJSCommand extends IRawCommand<CommandTypes> {
}
/**
 * Represents a transpiled command.
 */
export declare class FormedCommand<Types extends string | IRawCommand> {
    #private;
    private data;
    /**
     * Starts the command instance.
     */
    constructor(data: Types extends string ? IRawCommand<Types> : Types);
    /**
     * Call this command.
     * @param runtime - Runtime context to be used.
     */
    call(runtime: Runtime): Promise<void>;
    /**
     * Ensure the minification option in the command.
     * @returns {void}
     */
    ensureMinification(): void;
    /**
     * Ensure the command name.
     * @returns {void}
     */
    ensureName(): void;
    /**
     * Set the command path.
     * @param path - Path to be set.
     * @returns {void}
     */
    setPath(path: string | null): void;
    /**
     * Returns the load info for the log command table.
     */
    get loadCommandInfo(): string[];
    /**
     * Returns the command code.
     */
    get code(): string;
    /**
     * Returns the name of this command.
     */
    get name(): string | RegExp | undefined;
    /**
     * Returns the name of this command for the log table.
     */
    get stringifiedName(): string;
    /**
     * Returns the command path.
     */
    get path(): string | null;
    /**
     * Whether send the result of the command evaluation.
     */
    get sendResult(): boolean;
    /**
     * Returns the transpiled code.
     */
    get transpiledCode(): InstructionToken[];
    /**
     * Returns the command type.
     */
    get type(): string;
}
/**
 * Represents the load command source.
 */
export declare enum LoadCommandType {
    Loader = 0,
    Main = 1
}
/**
 * Represents a base command manager.
 */
export declare class BaseCommandManager<Types extends string> {
    #private;
    /**
     * Command cache.
     */
    cache: Map<string, FormedCommand<Types>>;
    /**
     * Creates an instance of BaseCommandManager class.
     * @param transpiler - Transpiler instance to use.
     */
    constructor();
    /**
     * Add a command into the cache.
     * @param command
     * @param loadType
     */
    private addCommand;
    /**
     * Get the cached commands by type.
     * @param type - The command type.
     * @returns {FormedCommand<Types>[]}
     */
    getType(type: Types): FormedCommand<Types>[];
    /**
     * Load commands from source.
     * @param path
     */
    load(path: string): void;
    /**
     * Reload commands from source.
     * @returns {boolean}
     */
    reload(): boolean | void;
}
/**
 * The default discord command manager.
 */
export declare class DiscordCommandManager extends BaseCommandManager<CommandTypes> {
}
