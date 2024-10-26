import { BaseInstruction } from '@core/BaseInstruction';
import { collectFiles } from './collectFiles'

/**
 * Load instructions from the desired directory.
 * @param dir - Directory to load the instructions from.
 */
export function loadInstructions(dir: string, callback: (instructions: typeof BaseInstruction[]) => void) {
    const loaded: typeof BaseInstruction[] = []
    const collected = collectFiles(dir)

    for (const file of collected) {
        const data: typeof BaseInstruction = require(file.dir).default
        loaded.push(data)
    }

    callback(loaded)
}