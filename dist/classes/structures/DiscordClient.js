"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const Command_1 = require("./Command");
const discord_js_1 = require("discord.js");
const EventManager_1 = require("../managers/EventManager");
const logCommands_1 = __importDefault(require("../../utils/functions/logCommands"));
const ready_1 = __importDefault(require("../../events/ready"));
/**
 * The class representing a Discord client.
 */
class DiscordClient extends discord_js_1.Client {
    extraOptions;
    /**
     * The discord client command manager.
     */
    commands = new Command_1.DiscordCommandManager();
    constructor(extraOptions) {
        super(extraOptions);
        this.extraOptions = extraOptions;
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
            let values = this.extraOptions.prefixes.values;
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
        if (this.extraOptions.events?.length) {
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
