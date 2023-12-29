"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Function_1 = require("../structures/Function");
exports.default = new Function_1.BaseFunction({
    description: 'Fixes a number.',
    parameters: [
        {
            name: 'Number',
            description: 'Number to be fixed.',
            required: true,
            resolver: 'Number',
            value: 'none'
        },
        {
            name: 'Decimals',
            description: 'Number of digits after the decimal point.',
            required: false,
            resolver: 'Number',
            value: '2'
        }
    ],
    code: async function (d, [num, decimals = '2']) {
        if (num === undefined)
            throw new d.error(d, 'required', 'Number', d.function?.name);
        if (isNaN(Number(num)))
            throw new d.error(d, 'invalid', 'Number', d.function?.name);
        return Number(num).toFixed(Number(decimals));
    }
});
