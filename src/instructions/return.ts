import { DataType, FieldLevel, Instruction } from '@structures/Instruction'

export default new Instruction({
    name: '$return',
    description: 'Returns a value.',
    brackets: true,
    compile: true,
    fields: [
        {
            name: 'Content',
            description: 'The content to return.',
            type: DataType.String,
            level: FieldLevel.Optional,
            spread: false
        }
    ],
    run(runtime, value) {
        return this.return(value![0] as string | undefined)
    }
})