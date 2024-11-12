import { DataType, FieldLevel, Instruction } from '@structures/Instruction'

export default new Instruction({
    name: '$log',
    description: 'Log the given content into the console.',
    brackets: true,
    compile: true,
    params: [
        {
            name: 'Content',
            description: 'The content to log.',
            type: DataType.String,
            level: FieldLevel.Required,
            spread: true
        }
    ],
    run(runtime, values) {
        console.log(...values)
        return this.ok()
    }
})