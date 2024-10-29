"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DiscordClient_instances, _DiscordClient_processPrefixes;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const Command_1 = require("./Command");
const discord_js_1 = require("discord.js");
const Transpiler_1 = require("../core/Transpiler");
const EventManager_1 = require("../core/EventManager");
/**
 * The class representing a Discord client.
 */
class DiscordClient extends discord_js_1.Client {
    constructor(extraOptions) {
        super(extraOptions);
        _DiscordClient_instances.add(this);
        this.extraOptions = extraOptions;
        /**
         * BDJS code transpiler.
         */
        this.transpiler = new Transpiler_1.Transpiler();
        /**
         * The discord client command manager.
         */
        this.commands = new Command_1.DiscordCommandManager(this.transpiler);
        __classPrivateFieldGet(this, _DiscordClient_instances, "m", _DiscordClient_processPrefixes).call(this);
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
     * Login the client to Discord.
     * @param token - The token to be used.
     * @returns {Promise<string>}
     */
    login(token) {
        // Load the events.
        if (this.extraOptions.events.length) {
            EventManager_1.EventManager.attach(this, 'built-ins', this.extraOptions.events);
        }
        return super.login(token);
    }
}
exports.DiscordClient = DiscordClient;
_DiscordClient_instances = new WeakSet(), _DiscordClient_processPrefixes = function _DiscordClient_processPrefixes() {
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
        const transpileValues = this.extraOptions.prefixes.advancedOptions.transpileValues ?? false;
        const transpileIndexes = Array.isArray(this.extraOptions.prefixes.advancedOptions.transpileIndexes) ? this.extraOptions.prefixes.advancedOptions.transpileIndexes : [];
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
};
