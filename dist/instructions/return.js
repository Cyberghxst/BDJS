"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("../classes/structures/Instruction");
exports.default = new Instruction_1.Instruction({
    name: '$return',
    description: 'Returns a value.',
    brackets: true,
    compile: true,
    fields: [
        {
            name: 'Content',
            description: 'The content to return.',
            type: Instruction_1.DataType.String,
            level: Instruction_1.FieldLevel.Optional,
            spread: false
        }
    ],
    run(runtime, value) {
        return this.return(value[0]);
    }
});
