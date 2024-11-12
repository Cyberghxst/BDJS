import { AutoModerationActionExecution, AutoModerationRule, BaseChannel, BaseGuildTextChannel, BaseGuildVoiceChannel, BaseInteraction, CacheType, ClientUser, DMChannel, Emoji, Entitlement, Guild, GuildEmoji, GuildMember, Interaction, InteractionDeferReplyOptions, InteractionDeferUpdateOptions, InteractionEditReplyOptions, InteractionReplyOptions, InteractionUpdateOptions, InteractionWebhook, Message, MessageContextMenuCommandInteraction, MessageCreateOptions, MessagePayload, MessageReaction, NewsChannel, NonThreadGuildBasedChannel, OmitPartialGroupDMChannel, PartialGuildMember, PartialMessage, PartialUser, Presence, PrivateThreadChannel, PublicThreadChannel, Role, SendableChannels, Shard, StageChannel, Sticker, TextBasedChannel, TextChannel, ThreadChannel, User, VoiceBasedChannel, Webhook, WebhookClient } from 'discord.js'
import { DiscordClient } from './DiscordClient'
import { Instruction } from './Instruction'
import { Container } from './Container'
import { FormedCommand } from './Command'

/**
 * Discord.js sendable contexts.
 */
export type Sendable = BaseGuildTextChannel 
    | BaseGuildVoiceChannel 
    | ClientUser 
    | DMChannel 
    | GuildMember 
    | InteractionWebhook 
    | NewsChannel 
    | PrivateThreadChannel 
    | PublicThreadChannel 
    | Shard 
    | StageChannel 
    | TextChannel 
    | ThreadChannel 
    | User 
    | Webhook 
    | WebhookClient
    | Interaction
    | OmitPartialGroupDMChannel<Message<boolean>>
    | NonThreadGuildBasedChannel
    | {}

/**
 * The cached properties for the runtime context.
 */
export interface RuntimeCache {
    automod: AutoModerationActionExecution | AutoModerationRule | null
    channel: BaseChannel | null
    emoji: GuildEmoji | Emoji | null
    entitlement: Entitlement | null
    guild: Guild | null
    interaction: Interaction | null
    member: GuildMember | PartialGuildMember | null
    message: Message | PartialMessage | null
    presence: Presence | null
    reaction: MessageReaction | null
    role: Role | null
    sticker: Sticker | null
    user: User | PartialUser | null
}

/**
 * Event states in the runtime.
 */
export type RuntimeStates = {
    [K in keyof RuntimeCache]?: {
        old?: RuntimeCache[K],
        new?: RuntimeCache[K]
    }
}

/**
 * All sendable payload types.
 */
export type SendablePayload = string 
    | MessagePayload
    | MessageCreateOptions
    | InteractionReplyOptions
    | InteractionUpdateOptions
    | InteractionEditReplyOptions
    | InteractionDeferReplyOptions
    | InteractionDeferUpdateOptions;

/**
 * This class stores the current context of discord.js
 */
export class Runtime<T extends Sendable = Sendable, Cached extends CacheType = CacheType> implements RuntimeCache {
    /**
     * Global runtime values that 
     * can be retrieved between commands.
     */
    static globalValues = new Map<string, any>()

    /**
     * Command arguments.
     */
    public args: string[] = []

    /**
     * The current command being executed.
     */
    public command: any | null = null

    /**
     * The message container.
     */
    public container = new Container()

    /**
     * Runtime states.
     */
    public states: RuntimeStates = {}

    /**
     * Variables this runtime has.
     */
    public variables = new Map<string, unknown>()

    /**
     * Creates an instance of Runtime.
     */
    public constructor(private data: T, public client: DiscordClient) {}

    /**
     * Set the arguments for this runtime.
     * @param args - List of arguments.
     * @returns {Runtime<Sendable, Cached>}
     */
    public setArgs(args: string[]) {
        this.args = args
        return this
    }

    /**
     * Set the current command.
     * @param command - Command to be set.
     * @returns {Runtime<Sendable, Cached>}
     */
    public setCommand<Type extends string = string, Command extends FormedCommand<Type> = FormedCommand<Type>>(command: Command) {
        this.command = command
        return this
    }

    /**
     * Sends a message to the current context.
     * @param message - The message to be sent.
     * @returns {Promise<Shard | Message<boolean> | import('discord.js').APIMessage | null>}
     */
    public async send<T extends SendablePayload>(message: T) {
        if (this.data instanceof BaseChannel && this.data.isSendable()) {
            return await this.data.send(<MessageCreateOptions>message)
        } else if (this.channel !== null && this.channel.isSendable()) {
            return await this.channel.send(<MessageCreateOptions>message)
        } else if (this.data instanceof User) {
            const dm: DMChannel | null = await this.data.createDM(true).catch(e => null)
            if (!dm) return null;

            return await dm.send(<MessageCreateOptions>message)
        } else if (this.data instanceof GuildMember) {
            const dm: DMChannel | null = await this.data.user.createDM(true).catch(e => null)
            if (!dm) return null;

            return await dm.send(<MessageCreateOptions>message)
        } else return null
    }

    /**
     * Set the runtime states.
     * @param states - The states to be set.
     * @returns {void}
     */
    public setState(states: RuntimeStates) {
        this.states = states
    }

    /**
     * Check whether current runtime has guild support.
     * @returns {this is this & { guild: Guild }}
     */
    public inGuild(): this is this & { guild: Guild } {
        return this.guild !== null
    }

    /**
     * Check whether the channel is sendable.
     * @returns {this is this & { channel: SendableChannels }}
     */
    public isSendable(): this is this & { channel: SendableChannels } {
        return this.channel !== null && this.channel.isSendable()
    }

    /**
     * Check whether the channel is text based.
     * @returns {this is this & { channel: TextBasedChannel }}
     */
    public isTextBased(): this is this & { channel: TextBasedChannel } {
        return this.channel !== null && this.channel.isTextBased()
    }

    /**
     * Check whether the channel is voice based.
     * @returns {this is this & { channel: VoiceBasedChannel }}
     */
    public isVoiceBased(): this is this & { channel: VoiceBasedChannel } {
        return this.channel !== null && this.channel.isVoiceBased()
    }

    /**
     * Points to the current automoderation execution context.
     * @returns {AutoModerationActionExecution | null}
     */
    public get automod(): AutoModerationActionExecution | null {
        return this.data instanceof AutoModerationActionExecution ? this.data : null
    }

    /**
     * Points to the current channel context.
     * @returns {BaseChannel | null}
     */
    public get channel(): BaseChannel | null {
        return this.data instanceof BaseChannel ? this.data : 'channel' in this.data && this.data.channel instanceof BaseChannel ? this.data.channel : null
    }

    /**
     * Points to the current emoji context.
     * @returns {GuildEmoji | Emoji | null}
     */
    public get emoji(): GuildEmoji | Emoji | null {
        return this.data instanceof GuildEmoji || this.data instanceof Emoji ? this.data : null
    }

    /**
     * Points to the current entitlement context.
     * @returns {Entitlement | null}
     */
    public get entitlement(): Entitlement | null {
        return this.data instanceof Entitlement ? this.data : null
    }

    /**
     * Points to the current guild context.
     * @returns {Guild | null}
     */
    public get guild(): Guild | null {
        return this.data instanceof Guild ? this.data : "guild" in this.data ? this.data.guild : null
    }

    /**
     * Points to the current interaction context.
     * @returns {Interaction<Cached> | null}
     */
    public get interaction(): Interaction<Cached> | null {
        return this.data instanceof BaseInteraction ? this.data as Interaction<Cached> & T : null
    }

    /**
     * Points to the current guild member context.
     */
    public get member(): GuildMember | null {
        return this.data instanceof GuildMember ? this.data as GuildMember & T : "member" in this.data ? this.data.member as GuildMember & T : null
    }

    /**
     * Points to the current message context.
     * @returns {Message<boolean> | null}
     */
    public get message(): Message<boolean> | null {
        return this.data instanceof Message ? this.data : "message" in this.data ? this.data.message : this.data instanceof MessageContextMenuCommandInteraction ? this.data.options.getMessage('message', false) : null
    }

    /**
     * Points to the current user presence context.
     * @returns {Presence | null}
     */
    public get presence(): Presence | null {
        return this.data instanceof Presence ? this.data : this.member !== null ? this.member.presence : null
    }

    /**
     * Points to the current message reaction context.
     * @returns {MessageReaction | null}
     */
    public get reaction(): MessageReaction | null {
        return this.data instanceof MessageReaction ? this.data : null
    }

    /**
     * Points to the current guild role context.
     * @returns {Role | null}
     */
    public get role(): Role | null {
        return this.data instanceof Role ? this.data : null
    }

    /**
     * Points to the current guild sticker context.
     * @returns {Sticker | null}
     */
    public get sticker(): Sticker | null {
        return this.data instanceof Sticker ? this.data : null
    }

    /**
     * Points to the current user context.
     * @returns {User | null}
     */
    public get user(): User | null {
        return this.data instanceof User ? this.data : this.data instanceof Message ? this.data.author : 'user' in this.data ? this.data.user : null
    }

    /**
     * Retrieves the name of the current command.
     * @returns {string}
     */
    public get commandName(): string {
        return this.interaction !== null && this.interaction.isCommand() ? this.interaction.commandName : this.command.stringifiedName
    }

    /**
     * Returns the instance name of the current context.
     */
    public get exactIs(): string {
        return this.data.constructor.name
    }

    /**
     * Global runtime values that 
     * can be retrieved between commands.
     */
    public get globals() {
        return Runtime.globalValues
    }
}