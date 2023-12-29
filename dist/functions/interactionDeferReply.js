"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
const discord_js_1 = require("discord.js");
const util_1 = require("util");
exports.default = new Function_1.BaseFunction({
    description: 'Defers an interaction.',
    parameters: [
        {
            name: 'Ephemeral',
            description: 'Send the defer reply as ephemeral.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
        },
        {
            name: 'Return ID',
            description: 'Returns the interaction reply ID.',
            required: false,
            compile: true,
            resolver: 'Boolean',
            value: 'false'
        }
    ],
    code: async function (d, [ephemeral = 'false', returnId = 'false']) {
        if (!(d.ctx?.raw instanceof discord_js_1.BaseInteraction))
            throw new d.error(d, 'disallowed', d.function?.name, 'interactions');
        if (!d.ctx?.raw.isRepliable())
            throw new d.error(d, 'custom', `${d.commandType} is not repliable.`);
        if (d.ctx?.raw.deferred)
            throw new d.error(d, 'custom', 'Cannot defer an interaction that is already deferred.');
        const data = await d.ctx?.raw.deferReply({ ephemeral: ephemeral === 'true' }).then((res) => {
            return res;
        }).catch(e => {
            throw new d.error(d, 'custom', (0, util_1.inspect)(e, { depth: 4 }));
        });
        if (data && data.id && returnId === 'true')
            return data.id;
    }
});
