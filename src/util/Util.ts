import { Guild } from 'discord.js'

export class Util {
    /**
     * Check if the provided string is bigint.
     * @param {string} data - The string to test.
     */
    static isBigInt(data: string) {
        return /-?0x[0-9a-fA-F]+n|-?0o[0-7]+n|-?0b[01]+n|-?[0-9]+n/g.test(data)
    }

    /**
     * Parses string to its native type.
     * @param {string} text The string to parse.
     */
    static parse(text: string): undefined | null | number | BigInt | Object | string {
        if (text === undefined) return undefined
        else if (text === null) return null
        
        text = text.trim()

        if (text === 'undefined') return undefined
        else if (text === 'null') return null
        else if (isNaN(Number(text)) && Number.isSafeInteger(text))
            return Number(text)
        else if (text.endsWith('n') && this.isBigInt(text))
            return BigInt(text.replace('n', ''))
        else {
            try {
                return JSON.parse(text)
            } catch {
                return text
            }
        }
    }

    static deepClone<T>(input: T): T {
        if (input === null || typeof input !== 'object') {
            return input
        }
        if (Array.isArray(input)) {
            const newArray = [] as any[]
            for (const item of input) {
                newArray.push(Util.deepClone(item))
            }
            return newArray as T
        }
        if (input instanceof Date) {
            return new Date(input.getTime()) as T
        }
        if (input instanceof RegExp) {
            const flags = (input as any).flags
            return new RegExp(input.source, flags) as T
        }
        if (input instanceof Map) {
            const newMap = new Map()
            for (const [key, value] of input) {
                newMap.set(Util.deepClone(key), Util.deepClone(value))
            }
            return newMap as T
        }
        if (input instanceof Set) {
            const newSet = new Set()
            for (const value of input) {
                newSet.add(Util.deepClone(value))
            }
            return newSet as T
        }      
        // Handle custom classes or objects
        if (typeof input === 'object') {
            const newObject: Record<string, any> = {}
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    newObject[key] = Util.deepClone(input[key])
                }
            }
            return newObject as T
        }
        // If the type is not handled, return the input as is
        return input;
    }
      

    /**
     * Get a guild channel.
     * @param {string} query - Channel resolver.
     * @param {Guild} guild - The guild where channel is in.
     * @returns {Promise<TextBasedChannel | null>}
     */
    static async getChannel(query: string, guild: Guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let channel = someId ? guild.channels.cache.get(someId) || (await guild.channels.fetch(someId).catch(e => null)) : null
        if (!channel) channel = guild.channels.cache.find(c => c.name.includes(query)) || null
        return channel
    }

    /**
     * Get a guild member.
     * @param {string} query - Member resolver.
     * @param {Guild} guild - The guild where member is in.
     * @returns {Promise<GuildMember | null>}
     */
    static async getMember(query: string, guild: Guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let member = someId ? guild.members.cache.get(someId) || (await guild.members.fetch(someId).catch(e => null)) : null
        if (!member) member = guild.members.cache.find(m => m.user.username.includes(query)) || null
        return member
    }

    /**
     * Get a guild role.
     * @param {string} query - Role resolver.
     * @param {Guild} guild - The guild where role is in.
     * @returns {Promise<Role | null>}
     */
    static async getRole(query: string, guild: Guild) {
        if (!query) return null
        const someId = query.replace(/[^\d]/g, '')
        let role = someId ? guild.roles.cache.get(someId) || (await guild.roles.fetch(someId).catch(e => null)) : null
        if (!role) role = guild.roles.cache.find(r => r.name.includes(query)) || null
        return role
    }
}