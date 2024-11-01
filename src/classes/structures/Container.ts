import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageMentionOptions } from 'discord.js'

/**
 * Message payload container.
 */
export class Container {
    /**
     * Allowed mentions for this message.
     */
    public allowedMentions: MessageMentionOptions = {}
    /**
     * Content this message has.
     */
    public content?: string
    /**
     * Attachments this message has.
     */
    public files: AttachmentBuilder[] = []
    /**
     * Message action rows.
     */
    public components: ActionRowBuilder[] = []
    /**
     * Embeds this message has.
     */
    public embeds: EmbedBuilder[] = []
    /**
     * Stickers this message has.
     */
    public stickers: string[] = []

    /**
     * Adds an action row to the container.
     * @returns {void}
     */
    public addActionRow() {
        this.components.push(new ActionRowBuilder())
    }

    /**
     * Adds a button to the container.
     * @param param0 - Button customization options.
     * @param actionRow - Action row index to add this button to.
     */
    public addButton(
        [
            style,
            customIdOrLinkOrSku,
            label,
            disabled,
            emoji
        ]: [
            keyof typeof ButtonStyle,
            string,
            string?,
            boolean?,
            string?
        ],
        actionRow = 0
    ) {
        const button = new ButtonBuilder()
        .setStyle(ButtonStyle[style])
        
        if (style === 'Link') {
            button.setURL(customIdOrLinkOrSku)
        } else if (style === 'Premium') {
            button.setSKUId(customIdOrLinkOrSku)
        } else {
            button.setCustomId(customIdOrLinkOrSku)
        }

        if (typeof label === 'string') button.setLabel(label);
        if (typeof disabled === 'boolean') button.setDisabled(disabled);
        if (typeof emoji === 'string') button.setEmoji(emoji);

        this.components[actionRow].addComponents(button)
    }

    /**
     * Adds an embed to the container.
     * @returns {void}
     */
    public addEmbed() {
        this.embeds.push(new EmbedBuilder())
    }

    /**
     * Gets an embed from the cache.
     * @param i - Embed index to get.
     * @returns {EmbedBuilder}
     */
    public getEmbed(i = 0) {
        return this.embeds.at(i)
    }

    /**
     * Reset the container.
     * @returns {void}
     */
    public reset() {
        this.allowedMentions = {}
        this.content = undefined
        this.components = []
        this.embeds = []
        this.files = []
        this.stickers = []
    }

    /**
     * Retrieves the button styles as a record.
     * @returns {Record<keyof typeof ButtonStyle, number>}
     */
    public buttonStyles(): Record<keyof typeof ButtonStyle, number> {
        return ButtonStyle
    }
}