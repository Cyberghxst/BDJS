import { ActionRowBuilder, AttachmentBuilder, ButtonStyle, EmbedBuilder, MessageMentionOptions } from 'discord.js';
/**
 * The available select menu types.
 */
type SelectMenuTypes = 'string' | 'user' | 'mentionable' | 'channel' | 'role';
/**
 * Message payload container.
 */
export declare class Container {
    /**
     * Allowed mentions for this message.
     */
    allowedMentions: MessageMentionOptions;
    /**
     * Content this message has.
     */
    content?: string;
    /**
     * Attachments this message has.
     */
    files: AttachmentBuilder[];
    /**
     * Message action rows.
     */
    components: ActionRowBuilder[];
    /**
     * Embeds this message has.
     */
    embeds: EmbedBuilder[];
    /**
     * Stickers this message has.
     */
    stickers: string[];
    /**
     * Adds an action row to the container.
     * @returns {void}
     */
    addActionRow(): void;
    /**
     * Adds a button to the container.
     * @param param0 - Button customization options.
     * @param actionRow - Action row index to add this button to.
     */
    addButton([style, customIdOrLinkOrSku, label, disabled, emoji]: [
        keyof typeof ButtonStyle,
        string,
        string?,
        boolean?,
        string?
    ], actionRow?: number): void;
    /**
     * Adds an embed to the container.
     * @returns {void}
     */
    addEmbed(): void;
    addSelectMenu([type, customId, placeholder, disabled, minValues, maxValues]: [
        SelectMenuTypes,
        string,
        string?,
        boolean?,
        number?,
        number?
    ], actionRow?: number): void;
    /**
     * Gets an embed from the cache.
     * @param i - Embed index to get.
     * @returns {EmbedBuilder}
     */
    getEmbed(i?: number): EmbedBuilder;
    /**
     * Reset the container.
     * @returns {void}
     */
    reset(): void;
    /**
     * Retrieves the button styles as a record.
     * @returns {Record<keyof typeof ButtonStyle, number>}
     */
    buttonStyles(): Record<keyof typeof ButtonStyle, number>;
}
export {};
