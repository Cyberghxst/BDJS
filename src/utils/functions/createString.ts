import { randomUUID } from 'crypto'

/**
 * Generates a random string.
 * @param length - The length of the string.
 * @returns {string}
 */
export default function(length = 15) {
    let cache = ''

    while (cache.length < length) {
        cache += randomUUID().replace(/[\d+-]/g, '')
    }

    return cache.slice(0, length)
}