"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const Logger_1 = require("../../classes/core/Logger");
function default_1(args, compiledArgs, identifier) {
    let i = 0;
    for (const arg of args) {
        if (arg.required && compiledArgs[i] === undefined || compiledArgs[i] === '') {
            Logger_1.Logger.warn(`${identifier} expected a value in "${arg.name}"; got nothing instead.`);
        }
        i++;
    }
}
