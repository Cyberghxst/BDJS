import { BaseCommandManager } from '@structures/Command'
import { AsciiTable3, AlignmentEnum } from 'ascii-table3'

/**
 * Log all commands cached in a command manager.
 * @param manager - The command manager to retrieve the cached commands from.
 * @returns {void}
 */
export default function<Types extends string>(manager: BaseCommandManager<Types>) {
    const rows: string[][] = []
    const table = new AsciiTable3('Commands')

    table.setHeading('Name', 'Type', 'Status', 'Path')
    .setAlign(2, AlignmentEnum.AUTO)
    .setStyle('compact')

    for (const commandData of manager.cache.values()) {
        rows.push(commandData.loadCommandInfo)
    }

    table.addRowMatrix(rows)

    console.log(table.toString())
}