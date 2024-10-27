"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordClient = void 0;
const Command_1 = require("./Command");
const Transpiler_1 = require("../core/Transpiler");
const discord_js_1 = require("discord.js");
class DiscordClient extends discord_js_1.Client {
    constructor() {
        super(...arguments);
        /**
         * BDJS code transpiler.
         */
        this.transpiler = new Transpiler_1.Transpiler();
        /**
         * The discord client command manager.
         */
        this.commands = new Command_1.DiscordCommandManager(this.transpiler);
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
}
exports.DiscordClient = DiscordClient;
