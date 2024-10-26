import { lstatSync, readdirSync } from 'fs'
import { join } from 'path'

/**
 * Collect the files inside the desired directory.
 * @param {string} dir - The directory to load files from.
 * @returns {ICollectedFile[]}
 */
export function collectFiles(dir: string, extension: `.${string}` = '.js') {
    const collected: ICollectedFile[] = []
    const files = readdirSync(dir)

    for (const file of files) {
        const info = lstatSync(join(dir, file))
        if (info.isDirectory()) {
            collected.push(...collectFiles(join(dir, file), extension))
            continue
        }

        if (file.endsWith(extension)) {
            const extension = '.' + file.split('.').pop() as `.${string}`
            const name = file.replace(extension, '')
            const path = join(dir, file)

            collected.push({ name, extension, dir: path })
        }
    }

    return collected
}

/**
 * Structure that represents a collected file.
 */
export interface ICollectedFile {
    name: string
    extension: `.${string}`
    dir: string
}