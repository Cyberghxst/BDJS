import { AutoModerationActionExecution, BaseChannel, BaseGuildTextChannel, BaseGuildVoiceChannel, CacheType, ClientUser, DMChannel, Emoji, Entitlement, Guild, GuildEmoji, GuildMember, Interaction, InteractionDeferReplyOptions, InteractionDeferUpdateOptions, InteractionEditReplyOptions, InteractionReplyOptions, InteractionUpdateOptions, InteractionWebhook, Message, MessageCreateOptions, MessagePayload, MessageReaction, NewsChannel, NonThreadGuildBasedChannel, OmitPartialGroupDMChannel, PrivateThreadChannel, PublicThreadChannel, Role, SendableChannels, Shard, StageChannel, Sticker, TextBasedChannel, TextChannel, ThreadChannel, User, VoiceBasedChannel, Webhook, WebhookClient } from 'discord.js';
import { DiscordClient } from './DiscordClient';
import { TranspiledCommand } from './Command';
/**
 * Discord.js sendable contexts.
 */
export type Sendable = BaseGuildTextChannel | BaseGuildVoiceChannel | ClientUser | DMChannel | GuildMember | InteractionWebhook | NewsChannel | PrivateThreadChannel | PublicThreadChannel | Shard | StageChannel | TextChannel | ThreadChannel | User | Webhook | WebhookClient | Interaction | OmitPartialGroupDMChannel<Message<boolean>> | NonThreadGuildBasedChannel;
/**
 * The cached properties for the runtime context.
 */
export interface RuntimeCache {
    automod: AutoModerationActionExecution | null;
    channel: BaseChannel | null;
    emoji: GuildEmoji | Emoji | null;
    entitlement: Entitlement | null;
    guild: Guild | null;
    interaction: Interaction | null;
    member: GuildMember | null;
    message: Message | null;
    reaction: MessageReaction | null;
    role: Role | null;
    sticker: Sticker | null;
    user: User | null;
}
/**
 * All sendable payload types.
 */
export type SendablePayload = string | MessagePayload | MessageCreateOptions | InteractionReplyOptions | InteractionUpdateOptions | InteractionEditReplyOptions | InteractionDeferReplyOptions | InteractionDeferUpdateOptions;
/**
 * This class stores the current context of discord.js
 */
export declare class Runtime<T extends Sendable = Sendable, Cached extends CacheType = CacheType> implements RuntimeCache {
    private data;
    client: DiscordClient;
    /**
     * Global runtime values that
     * can be retrieved between commands.
     */
    static globalValues: Map<string, any>;
    /**
     * The current command being executed.
     */
    command: TranspiledCommand<any> | null;
    /**
     * Creates an instance of Runtime.
     */
    constructor(data: T, client: DiscordClient);
    /**
     * Set the current command.
     * @param command - Command to be set.
     * @returns {Runtime<Sendable, Cached>}
     */
    setCommand<Type extends string = string, Command extends TranspiledCommand<Type> = TranspiledCommand<Type>>(command: Command): this;
    /**
     * Sends a message to the current context.
     * @param message - The message to be sent.
     * @returns {Promise<Shard | Message<boolean> | import('discord.js').APIMessage | null>}
     */
    send<T extends SendablePayload>(message: T): Promise<Message<true> | Message<false>>;
    /**
     * Check whether current runtime has guild support.
     * @returns {this is this & { guild: Guild }}
     */
    inGuild(): this is this & {
        guild: Guild;
    };
    /**
     * Check whether the channel is sendable.
     * @returns {this is this & { channel: SendableChannels }}
     */
    isSendable(): this is this & {
        channel: SendableChannels;
    };
    /**
     * Check whether the channel is text based.
     * @returns {this is this & { channel: TextBasedChannel }}
     */
    isTextBased(): this is this & {
        channel: TextBasedChannel;
    };
    /**
     * Check whether the channel is voice based.
     * @returns {this is this & { channel: VoiceBasedChannel }}
     */
    isVoiceBased(): this is this & {
        channel: VoiceBasedChannel;
    };
    /**
     * Points to the current automoderation execution context.
     * @returns {AutoModerationActionExecution | null}
     */
    get automod(): AutoModerationActionExecution | null;
    /**
     * Points to the current channel context.
     * @returns {BaseChannel | null}
     */
    get channel(): BaseChannel | null;
    /**
     * Points to the current emoji context.
     * @returns {GuildEmoji | Emoji | null}
     */
    get emoji(): GuildEmoji | Emoji | null;
    /**
     * Points to the current entitlement context.
     * @returns {Entitlement | null}
     */
    get entitlement(): Entitlement | null;
    /**
     * Points to the current guild context.
     * @returns {Guild | null}
     */
    get guild(): Guild | null;
    /**
     * Points to the current interaction context.
     * @returns {Interaction<Cached> | null}
     */
    get interaction(): Interaction<Cached> | null;
    /**
     * Points to the current guild member context.
     */
    get member(): GuildMember | null;
    /**
     * Points to the current message context.
     * @returns {Message<boolean> | null}
     */
    get message(): Message<boolean> | null;
    /**
     * Points to the current message reaction context.
     * @returns {MessageReaction | null}
     */
    get reaction(): MessageReaction | null;
    /**
     * Points to the current guild role context.
     * @returns {Role | null}
     */
    get role(): Role | null;
    /**
     * Points to the current guild sticker context.
     * @returns {Sticker | null}
     */
    get sticker(): Sticker | null;
    /**
     * Points to the current user context.
     * @returns {User | null}
     */
    get user(): User | null;
    /**
     * Returns the instance name of the current context.
     */
    get exactIs(): string;
    /**
     * Global runtime values that
     * can be retrieved between commands.
     */
    get globals(): Map<string, any>;
}
