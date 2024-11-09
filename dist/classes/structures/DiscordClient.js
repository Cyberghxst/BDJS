"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const Command_1 = require("./Command");
const discord_js_1 = require("discord.js");
const EventManager_1 = require("@core/EventManager");
const Transpiler_1 = require("@core/Transpiler");
const ready_1 = __importDefault(require("../../events/ready"));
const logCommands_1 = __importDefault(require("@functions/logCommands"));
/**
 * The class representing a Discord client.
 */
class DiscordClient extends discord_js_1.Client {
    constructor(extraOptions) {
        super(extraOptions);
        this.extraOptions = extraOptions;
        /**
         * BDJS code transpiler.
         */
        this.transpiler = new Transpiler_1.Transpiler();
        /**
         * The discord client command manager.
         */
        this.commands = new Command_1.DiscordCommandManager(this.transpiler);
        EventManager_1.EventManager.loadBuiltIns();
    }
    /**
     * Add commands into the command manager.
     * @param commands - Commands to be cached.
     * @returns {DiscordClient}
     */
    addCommand(...commands) {
        for (const command of commands) {
            this.commands['addCommand'](command, Command_1.LoadCommandType.Main);
        }
        return this;
    }
    /**
     * Process the prefixes based on the given options.
     */
    processPrefixes() {
        if (this.extraOptions.prefixes === null)
            return;
        if (typeof this.extraOptions.prefixes === 'string') {
            this.extraOptions.prefixes = [this.extraOptions.prefixes];
        }
        else if (Array.isArray(this.extraOptions.prefixes)) {
            this.extraOptions.prefixes = this.extraOptions.prefixes;
        }
        else {
            const mentionAsPrefix = this.extraOptions.prefixes.mentionAsPrefix ?? false;
            const transpileValues = this.extraOptions.prefixes.advancedOptions?.transpileValues ?? false;
            const transpileIndexes = Array.isArray(this.extraOptions.prefixes.advancedOptions?.transpileIndexes) ? this.extraOptions.prefixes.advancedOptions.transpileIndexes : [];
            let values = this.extraOptions.prefixes.values;
            if (transpileValues && transpileIndexes.length === 0) {
                values = values.map((prefix) => this.transpiler.transpile(prefix, false));
            }
            else if (transpileValues && transpileIndexes.length > 0) {
                for (const index of transpileIndexes) {
                    values[index] = this.transpiler.transpile(values[index], false);
                }
            }
            if (mentionAsPrefix) {
                values.push(`<@${this.user.username}>`, `<@!${this.user.username}>`);
            }
            this.extraOptions.prefixes = values;
        }
    }
    /**
     * Login the client to Discord.
     * @param token - The token to be used.
     * @returns {Promise<string>}
     */
    login(token) {
        // Load the events.
        if (this.extraOptions.events.length) {
            EventManager_1.EventManager.attach(this, 'built-ins', this.extraOptions.events);
        }
        // Attaching the ready event.
        ready_1.default.attach(this);
        // Log the cached commands.
        (0, logCommands_1.default)(this.commands);
        return super.login(token);
    }
}
exports.DiscordClient = DiscordClient;
