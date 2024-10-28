import { Transpiler } from '../core/Transpiler';
/**
 * Command types that Discord contexts provide.
 */
export type DiscordCommandTypes = 'prefixed' | 'unprefixed' | 'alwaysReply' | 'messageDelete' | 'messageUpdate' | 'error' | 'ready' | 'anyInteraction' | 'modalInteraction' | 'buttonInteraction' | 'commandInteraction' | 'selectMenuInteraction' | 'userContextMenuInteraction' | 'messageContextMenuInteraction' | 'autocompleteInteraction' | 'memberJoin' | 'memberLeave' | 'memberUpdate' | 'reactionAdd' | 'reactionRemove' | 'stickerCreate' | 'stickerDelete' | 'stickerUpdate' | 'roleCreate' | 'roleDelete' | 'roleUpdate' | 'botJoin' | 'botLeave' | 'channelCreate' | 'channelDelete' | 'channelUpdate' | 'threadCreate' | 'threadDelete' | 'threadUpdate' | 'banAdd' | 'banRemove' | 'emojiCreate' | 'emojiDelete' | 'emojiUpdate' | 'presenceUpdate' | 'userUpdate' | 'automodRuleCreate' | 'automodRuleDelete' | 'automodRuleUpdate' | 'entitlementCreate' | 'entitlementUpdate' | 'entitlementDelete' | 'typingStart';
/**
 * Custom command types that BDJS provides.
 */
export type CustomCommandTypes = 'timeout' | 'interval';
/**
 * All command types provided by the library.
 */
export type CommandTypes = DiscordCommandTypes | CustomCommandTypes;
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
    type: string;
    /**
     * The native code of this command.
     */
    code: string;
    /**
     * The transpiled code of the command.
     */
    transpiled?: string | null;
    /**
     * The transpiled code without any minification/beautification filter.
     */
    rawTranspiledCode: string | null;
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
}
/**
 * A BDJS command.
 */
export interface BDJSCommand extends IRawCommand<CommandTypes> {
}
/**
 * Represents a transpiled command.
 */
export declare class TranspiledCommand<Types extends string | IRawCommand> {
    #private;
    private data;
    /**
     * Starts the command instance.
     */
    constructor(data: Types extends string ? IRawCommand<Types> : Types, transpiler: Transpiler);
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
     * Returns the load info for the log command table.
     */
    get loadCommandInfo(): string[];
    /**
     * Returns the name of this command.
     */
    get name(): string;
    /**
     * Returns the command path.
     */
    get path(): string;
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
    private transpiler;
    /**
     * Command cache.
     */
    cache: Map<string, TranspiledCommand<Types>>;
    constructor(transpiler: Transpiler);
    /**
     * Add a command into the cache.
     * @param command
     * @param loadType
     */
    private addCommand;
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
