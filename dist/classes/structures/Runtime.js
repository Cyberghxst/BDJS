"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const discord_js_1 = require("discord.js");
const Container_1 = require("./Container");
/**
 * This class stores the current context of discord.js
 */
class Runtime {
    data;
    client;
    /**
     * Global runtime values that
     * can be retrieved between commands.
     */
    static globalValues = new Map();
    /**
     * Command arguments.
     */
    args = [];
    /**
     * The current command being executed.
     */
    command = null;
    /**
     * The message container.
     */
    container = new Container_1.Container();
    /**
     * Runtime states.
     */
    states = {};
    /**
     * Variables this runtime has.
     */
    variables = new Map();
    /**
     * Creates an instance of Runtime.
     */
    constructor(data, client) {
        this.data = data;
        this.client = client;
    }
    /**
     * Set the arguments for this runtime.
     * @param args - List of arguments.
     * @returns {Runtime<Sendable, Cached>}
     */
    setArgs(args) {
        this.args = args;
        return this;
    }
    /**
     * Set the current command.
     * @param command - Command to be set.
     * @returns {Runtime<Sendable, Cached>}
     */
    setCommand(command) {
        this.command = command;
        return this;
    }
    /**
     * Sends a message to the current context.
     * @param message - The message to be sent.
     * @returns {Promise<Shard | Message<boolean> | import('discord.js').APIMessage | null>}
     */
    async send(message) {
        if (this.data instanceof discord_js_1.BaseChannel && this.data.isSendable()) {
            return await this.data.send(message);
        }
        else if (this.channel !== null && this.channel.isSendable()) {
            return await this.channel.send(message);
        }
        else if (this.data instanceof discord_js_1.User) {
            const dm = await this.data.createDM(true).catch(e => null);
            if (!dm)
                return null;
            return await dm.send(message);
        }
        else if (this.data instanceof discord_js_1.GuildMember) {
            const dm = await this.data.user.createDM(true).catch(e => null);
            if (!dm)
                return null;
            return await dm.send(message);
        }
        else
            return null;
    }
    /**
     * Set the runtime states.
     * @param states - The states to be set.
     * @returns {void}
     */
    setState(states) {
        this.states = states;
    }
    /**
     * Check whether current runtime has guild support.
     * @returns {this is this & { guild: Guild }}
     */
    inGuild() {
        return this.guild !== null;
    }
    /**
     * Check whether the channel is sendable.
     * @returns {this is this & { channel: SendableChannels }}
     */
    isSendable() {
        return this.channel !== null && this.channel.isSendable();
    }
    /**
     * Check whether the channel is text based.
     * @returns {this is this & { channel: TextBasedChannel }}
     */
    isTextBased() {
        return this.channel !== null && this.channel.isTextBased();
    }
    /**
     * Check whether the channel is voice based.
     * @returns {this is this & { channel: VoiceBasedChannel }}
     */
    isVoiceBased() {
        return this.channel !== null && this.channel.isVoiceBased();
    }
    /**
     * Points to the current automoderation execution context.
     * @returns {AutoModerationActionExecution | null}
     */
    get automod() {
        return this.data instanceof discord_js_1.AutoModerationActionExecution ? this.data : null;
    }
    /**
     * Points to the current channel context.
     * @returns {BaseChannel | null}
     */
    get channel() {
        return this.data instanceof discord_js_1.BaseChannel ? this.data : 'channel' in this.data && this.data.channel instanceof discord_js_1.BaseChannel ? this.data.channel : null;
    }
    /**
     * Points to the current emoji context.
     * @returns {GuildEmoji | Emoji | null}
     */
    get emoji() {
        return this.data instanceof discord_js_1.GuildEmoji || this.data instanceof discord_js_1.Emoji ? this.data : null;
    }
    /**
     * Points to the current entitlement context.
     * @returns {Entitlement | null}
     */
    get entitlement() {
        return this.data instanceof discord_js_1.Entitlement ? this.data : null;
    }
    /**
     * Points to the current guild context.
     * @returns {Guild | null}
     */
    get guild() {
        return this.data instanceof discord_js_1.Guild ? this.data : "guild" in this.data ? this.data.guild : null;
    }
    /**
     * Points to the current interaction context.
     * @returns {Interaction<Cached> | null}
     */
    get interaction() {
        return this.data instanceof discord_js_1.BaseInteraction ? this.data : null;
    }
    /**
     * Points to the current guild member context.
     */
    get member() {
        return this.data instanceof discord_js_1.GuildMember ? this.data : "member" in this.data ? this.data.member : null;
    }
    /**
     * Points to the current message context.
     * @returns {Message<boolean> | null}
     */
    get message() {
        return this.data instanceof discord_js_1.Message ? this.data : "message" in this.data ? this.data.message : this.data instanceof discord_js_1.MessageContextMenuCommandInteraction ? this.data.options.getMessage('message', false) : null;
    }
    /**
     * Points to the current user presence context.
     * @returns {Presence | null}
     */
    get presence() {
        return this.data instanceof discord_js_1.Presence ? this.data : this.member !== null ? this.member.presence : null;
    }
    /**
     * Points to the current message reaction context.
     * @returns {MessageReaction | null}
     */
    get reaction() {
        return this.data instanceof discord_js_1.MessageReaction ? this.data : null;
    }
    /**
     * Points to the current guild role context.
     * @returns {Role | null}
     */
    get role() {
        return this.data instanceof discord_js_1.Role ? this.data : null;
    }
    /**
     * Points to the current guild sticker context.
     * @returns {Sticker | null}
     */
    get sticker() {
        return this.data instanceof discord_js_1.Sticker ? this.data : null;
    }
    /**
     * Points to the current user context.
     * @returns {User | null}
     */
    get user() {
        return this.data instanceof discord_js_1.User ? this.data : this.data instanceof discord_js_1.Message ? this.data.author : 'user' in this.data ? this.data.user : null;
    }
    /**
     * Retrieves the name of the current command.
     * @returns {string}
     */
    get commandName() {
        return this.interaction !== null && this.interaction.isCommand() ? this.interaction.commandName : this.command?.stringifiedName ?? '';
    }
    /**
     * Returns the instance name of the current context.
     */
    get exactIs() {
        return this.data.constructor.name;
    }
    /**
     * Global runtime values that
     * can be retrieved between commands.
     */
    get globals() {
        return Runtime.globalValues;
    }
}
exports.Runtime = Runtime;
