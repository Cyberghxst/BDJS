"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordCommandManager = exports.BaseCommandManager = exports.LoadCommandType = exports.FormedCommand = void 0;
const collectFiles_1 = require("../../utils/functions/collectFiles");
const createString_1 = __importDefault(require("../../utils/functions/createString"));
const logCommands_1 = __importDefault(require("../../utils/functions/logCommands"));
const ascii_table3_1 = require("ascii-table3");
const Logger_1 = require("../core/Logger");
const cli_color_1 = __importDefault(require("cli-color"));
const Lexer_1 = require("../core/Lexer");
/**
 * Represents a transpiled command.
 */
class FormedCommand {
    data;
    /**
     * Additional information about the command to be logged.
     */
    #logOptions = {
        pass: true,
        error: undefined,
        warnings: [],
    };
    /**
     * Starts the command instance.
     */
    constructor(data) {
        this.data = data;
        this.ensureMinification(); // Ensure the minification option.
        this.ensureName(); // Ensure the command name.
        data.compiled = new Lexer_1.Lexer(data.code).toAST();
    }
    /**
     * Call this command.
     * @param runtime - Runtime context to be used.
     */
    async call(runtime) {
        runtime.setCommand(this);
        /*if (isAsyncFunction(this.code)) {
            await this.code(runtime);
        } else if (!isAsyncFunction(this.code)) {
            this.code(runtime);
        }*/
    }
    /**
     * Ensure the minification option in the command.
     * @returns {void}
     */
    ensureMinification() {
        this.data.minify =
            typeof this.data.minify !== 'boolean' ? true : this.data.minify;
    }
    /**
     * Ensure the command name.
     * @returns {void}
     */
    ensureName() {
        this.data.name =
            this.data.name === undefined ? (0, createString_1.default)() : this.data.name;
    }
    /**
     * Set the command path.
     * @param path - Path to be set.
     * @returns {void}
     */
    setPath(path) {
        this.data.path = path;
    }
    /**
     * Returns the load info for the log command table.
     */
    get loadCommandInfo() {
        return [
            this.data.name instanceof RegExp
                ? this.data.name.source
                : this.data.name || 'Unknown',
            this.data.type,
            this.#logOptions.pass
                ? cli_color_1.default.green('LOADED')
                : cli_color_1.default.red('NOT LOADED'),
            this.data.path === null
                ? 'MAIN FILE'
                : ascii_table3_1.AsciiTable3.truncateString(this.data.path, 20),
        ];
    }
    /**
     * Returns the command code.
     */
    get code() {
        return this.data.code;
    }
    /**
     * Returns the name of this command.
     */
    get name() {
        return this.data.name;
    }
    /**
     * Returns the name of this command for the log table.
     */
    get stringifiedName() {
        return this.data.name instanceof RegExp ? this.data.name.source : this.data.name || 'Unknown';
    }
    /**
     * Returns the command path.
     */
    get path() {
        return this.data.path;
    }
    /**
     * Whether send the result of the command evaluation.
     */
    get sendResult() {
        return this.data.sendResult ?? false;
    }
    /**
     * Returns the transpiled code.
     */
    get compiled() {
        return this.data.compiled;
    }
    /**
     * Returns the command type.
     */
    get type() {
        return this.data.type;
    }
}
exports.FormedCommand = FormedCommand;
/**
 * Represents the load command source.
 */
var LoadCommandType;
(function (LoadCommandType) {
    LoadCommandType[LoadCommandType["Loader"] = 0] = "Loader";
    LoadCommandType[LoadCommandType["Main"] = 1] = "Main";
})(LoadCommandType || (exports.LoadCommandType = LoadCommandType = {}));
/**
 * Represents a base command manager.
 */
class BaseCommandManager {
    /**
     * Saves the command path for later loading.
     */
    #path = null;
    /**
     * Command cache.
     */
    cache = new Map();
    /**
     * Creates an instance of BaseCommandManager class.
     * @param transpiler - Transpiler instance to use.
     */
    constructor() { }
    /**
     * Add a command into the cache.
     * @param command
     * @param loadType
     */
    addCommand(command, loadType = LoadCommandType.Main) {
        const transpiledCommand = new FormedCommand(command);
        transpiledCommand.setPath(loadType === LoadCommandType.Main ? null : command.path);
        this.cache.set(transpiledCommand.stringifiedName, transpiledCommand);
    }
    /**
     * Get the cached commands by type.
     * @param type - The command type.
     * @returns {FormedCommand<Types>[]}
     */
    getType(type) {
        return Array.from(this.cache.values()).filter((c) => c.type === type);
    }
    /**
     * Load commands from source.
     * @param path
     */
    load(path) {
        const fileTree = (0, collectFiles_1.collectFiles)(path);
        for (const file of fileTree) {
            let data = require(file.dir);
            if (data.default)
                data = data.default;
            data = Array.isArray(data) ? data : [data];
            for (const command of data) {
                command.path = file.dir;
                this.addCommand(command, LoadCommandType.Loader);
            }
        }
    }
    /**
     * Reload commands from source.
     * @returns {boolean}
     */
    reload() {
        if (!this.#path)
            return Logger_1.Logger.error('Cannot find a commands directory.');
        const size = this.cache.size;
        for (const command of this.cache.values()) {
            if (command.path === null)
                continue;
            this.cache.delete(command.stringifiedName);
        }
        this.load(this.#path);
        (0, logCommands_1.default)(this);
        return size !== this.cache.size;
    }
}
exports.BaseCommandManager = BaseCommandManager;
/**
 * The default discord command manager.
 */
class DiscordCommandManager extends BaseCommandManager {
}
exports.DiscordCommandManager = DiscordCommandManager;
