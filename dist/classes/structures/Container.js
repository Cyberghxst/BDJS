"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const discord_js_1 = require("discord.js");
/**
 * Message payload container.
 */
class Container {
    constructor() {
        /**
         * Allowed mentions for this message.
         */
        this.allowedMentions = {};
        /**
         * Attachments this message has.
         */
        this.files = [];
        /**
         * Message action rows.
         */
        this.components = [];
        /**
         * Embeds this message has.
         */
        this.embeds = [];
        /**
         * Stickers this message has.
         */
        this.stickers = [];
    }
    /**
     * Adds an action row to the container.
     * @returns {void}
     */
    addActionRow() {
        this.components.push(new discord_js_1.ActionRowBuilder());
    }
    /**
     * Adds a button to the container.
     * @param param0 - Button customization options.
     * @param actionRow - Action row index to add this button to.
     */
    addButton([style, customIdOrLinkOrSku, label, disabled, emoji], actionRow = 0) {
        const button = new discord_js_1.ButtonBuilder()
            .setStyle(discord_js_1.ButtonStyle[style]);
        if (style === 'Link') {
            button.setURL(customIdOrLinkOrSku);
        }
        else if (style === 'Premium') {
            button.setSKUId(customIdOrLinkOrSku);
        }
        else {
            button.setCustomId(customIdOrLinkOrSku);
        }
        if (typeof label === 'string')
            button.setLabel(label);
        if (typeof disabled === 'boolean')
            button.setDisabled(disabled);
        if (typeof emoji === 'string')
            button.setEmoji(emoji);
        this.components[actionRow].addComponents(button);
    }
    /**
     * Adds an embed to the container.
     * @returns {void}
     */
    addEmbed() {
        this.embeds.push(new discord_js_1.EmbedBuilder());
    }
    addSelectMenu([type, customId, placeholder, disabled, minValues, maxValues], actionRow = 0) {
        let selectMenu;
        switch (type) {
            case 'string':
                selectMenu = new discord_js_1.StringSelectMenuBuilder();
                break;
            case 'channel':
                selectMenu = new discord_js_1.ChannelSelectMenuBuilder();
                break;
            case 'mentionable':
                selectMenu = new discord_js_1.MentionableSelectMenuBuilder();
                break;
            case 'role':
                selectMenu = new discord_js_1.RoleSelectMenuBuilder();
                break;
            case 'user':
                selectMenu = new discord_js_1.UserSelectMenuBuilder();
                break;
        }
        selectMenu.setCustomId(customId)
            .setDisabled(disabled);
        if (placeholder)
            selectMenu.setPlaceholder(placeholder);
        if (minValues)
            selectMenu.setMinValues(minValues);
        if (maxValues)
            selectMenu.setMaxValues(maxValues);
        this.components[actionRow].addComponents(selectMenu);
    }
    /**
     * Gets an embed from the cache.
     * @param i - Embed index to get.
     * @returns {EmbedBuilder}
     */
    getEmbed(i = 0) {
        if (!this.embeds.at(i)) {
            while (!this.embeds.at(i)) {
                this.addEmbed();
            }
        }
        return this.embeds.at(i);
    }
    /**
     * Reset the container.
     * @returns {void}
     */
    reset() {
        this.allowedMentions = {};
        this.content = undefined;
        this.components = [];
        this.embeds = [];
        this.files = [];
        this.stickers = [];
    }
    /**
     * Retrieves the button styles as a record.
     * @returns {Record<keyof typeof ButtonStyle, number>}
     */
    buttonStyles() {
        return discord_js_1.ButtonStyle;
    }
}
exports.Container = Container;
