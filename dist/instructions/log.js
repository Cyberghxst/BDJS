"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Instruction_1 = require("../classes/structures/Instruction");
exports.default = new Instruction_1.Instruction({
    name: '$log',
    description: 'Log the given content into the console.',
    brackets: true,
    compile: true,
    params: [
        {
            name: 'Content',
            description: 'The content to log.',
            type: Instruction_1.DataType.String,
            level: Instruction_1.FieldLevel.Required,
            spread: true
        }
    ],
    run(runtime, values) {
        console.log(...values);
        return this.ok();
    }
});
