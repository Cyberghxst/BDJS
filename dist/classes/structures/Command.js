"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _TranspiledCommand_logOptions, _BaseCommandManager_path;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordCommandManager = exports.BaseCommandManager = exports.LoadCommandType = exports.TranspiledCommand = void 0;
const collectFiles_1 = require("../../utils/functions/collectFiles");
const createString_1 = __importDefault(require("../../utils/functions/createString"));
const ascii_table3_1 = require("ascii-table3");
const Logger_1 = require("../core/Logger");
const uglify_js_1 = require("uglify-js");
const cli_color_1 = __importDefault(require("cli-color"));
const types_1 = require("node:util/types");
const runCode_1 = __importDefault(require("../../utils/functions/runCode"));
/**
 * Represents a transpiled command.
 */
class TranspiledCommand {
    /**
     * Starts the command instance.
     */
    constructor(data, transpiler) {
        this.data = data;
        /**
         * Additional information about the command to be logged.
         */
        _TranspiledCommand_logOptions.set(this, {
            pass: true,
            error: undefined,
            warnings: [],
        });
        this.ensureMinification(); // Ensure the minification option.
        this.ensureName(); // Ensure the command name.
        let executor; // Creating the executor.
        if (typeof data.code === 'string') {
            // Transpiling the native code.
            let transpiledCode = transpiler.transpile(data.code);
            // Assign the raw output to its property.
            data.rawTranspiledCode = transpiledCode;
            // Checking if it was transpiled.
            if (typeof transpiledCode === 'string') {
                // Minify the command
                if (data.minify) {
                    const minified = (0, uglify_js_1.minify)(transpiledCode);
                    // Assign the error if any.
                    if (minified.error instanceof Error) {
                        __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").error = minified.error;
                        __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").pass = false;
                    }
                    // Assign the warning if any.
                    if (Array.isArray(minified.warnings)) {
                        __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").warnings = minified.warnings;
                    }
                    // Assign the minified code.
                    transpiledCode = minified.code;
                }
                else {
                    const beautified = (0, uglify_js_1.minify)(transpiledCode, {
                        compress: false,
                        mangle: false,
                        output: {
                            comments: 'all',
                            beautify: true,
                        },
                    });
                    // Assign the error if any.
                    if (beautified.error instanceof Error) {
                        __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").error = beautified.error;
                        __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").pass = false;
                    }
                    // Assign the warning if any.
                    if (Array.isArray(beautified.warnings)) {
                        __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").warnings = beautified.warnings;
                    }
                    // Assign the beautified code.
                    transpiledCode = beautified.code;
                }
                // Assign the transpiled code to the command.
                data.transpiled = transpiledCode;
                executor = eval(`const __command_executor__ = async (runtime) => { ${transpiledCode} }; __command_executor__`);
            }
        }
        else {
            executor = data.code;
        }
        data.code = executor;
    }
    /**
     * Call this command.
     * @param runtime - Runtime context to be used.
     */
    async call(runtime) {
        runtime.setCommand(this);
        if (typeof this.code === 'function' && (0, types_1.isAsyncFunction)(this.code)) {
            await this.code(runtime);
        }
        else if (typeof this.code === 'function' && !(0, types_1.isAsyncFunction)(this.code)) {
            this.code(runtime);
        }
        else {
            (0, runCode_1.default)(this.transpiledCode, runtime);
        }
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
            __classPrivateFieldGet(this, _TranspiledCommand_logOptions, "f").pass
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
    get transpiledCode() {
        return this.data.transpiled;
    }
    /**
     * Returns the command type.
     */
    get type() {
        return this.data.type;
    }
}
exports.TranspiledCommand = TranspiledCommand;
_TranspiledCommand_logOptions = new WeakMap();
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
     * Creates an instance of BaseCommandManager class.
     * @param transpiler - Transpiler instance to use.
     */
    constructor(transpiler) {
        this.transpiler = transpiler;
        /**
         * Saves the command path for later loading.
         */
        _BaseCommandManager_path.set(this, null
        /**
         * Command cache.
         */
        );
        /**
         * Command cache.
         */
        this.cache = new Map();
    }
    /**
     * Add a command into the cache.
     * @param command
     * @param loadType
     */
    addCommand(command, loadType = LoadCommandType.Main) {
        const transpiledCommand = new TranspiledCommand(command, this.transpiler);
        transpiledCommand.setPath(loadType === LoadCommandType.Main ? null : command.path);
        this.cache.set(transpiledCommand.stringifiedName, transpiledCommand);
    }
    /**
     * Get the cached commands by type.
     * @param type - The command type.
     * @returns {TranspiledCommand<Types>[]}
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
        if (!__classPrivateFieldGet(this, _BaseCommandManager_path, "f"))
            return Logger_1.Logger.error('Cannot find a commands directory.');
        const size = this.cache.size;
        for (const command of this.cache.values()) {
            if (command.path === null)
                continue;
            this.cache.delete(command.stringifiedName);
        }
        return size !== this.cache.size;
    }
}
exports.BaseCommandManager = BaseCommandManager;
_BaseCommandManager_path = new WeakMap();
/**
 * The default discord command manager.
 */
class DiscordCommandManager extends BaseCommandManager {
}
exports.DiscordCommandManager = DiscordCommandManager;
