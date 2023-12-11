import { BaseFunction } from '../structures/Function'
import { getUserProperty } from './userFetch'
import { User } from 'discord.js'

export default new BaseFunction({
    description: 'Get an user property.',
    parameters: [
        {
            name: 'Property',
            description: 'User property name.',
            required: true,
            resolver: 'String',
            value: 'none'
        },
        {
            name: 'User ID',
            description: 'User ID to get the property from.',
            required: true,
            resolver: 'String',
            value: 'd.ctx?.user?.id'
        }
    ],
    code: async function(d, [property, memberID = d.ctx?.user?.id]) {
        if (property === undefined) throw new d.error(d, 'required', 'Property Name', d.function?.name!)
        if (memberID === undefined) throw new d.error(d, 'invalid', 'User ID', d.function?.name!)

        const user = d.bot?.users.cache.get(memberID) as User & Record<string, string>
        if (!user) throw new d.error(d, 'invalid', 'user', d.function?.name!)

        const types = Object.keys(user).map(prop => prop.toLowerCase()).concat([
            'isbot'
        ])
        if (!types.includes(property.toLowerCase())) throw new d.error(d, 'invalid', 'Property', d.function?.name!)

        return getUserProperty(user, property)
    }
})