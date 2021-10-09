import { CommandInteraction, Message } from 'discord.js'

import { Plugin, Command, MessageHanlder } from '../pluginManager'
import whois from './api'

const commands : Command[] = [{
    name: 'ktohakuje',
    description: 'Sprawdź kto jest teraz w spejsie',
    handle: async (interaction: CommandInteraction) : Promise<void> => {
        await interaction.reply(await whois())
    }
}] 

const messageHandlers: MessageHanlder[] = [{
    predicate: async (msg: Message) => {
        const substrings = [
            'kto jest',
            'jest ktoś'
        ]

        return substrings.some(substring => msg.content.toLowerCase().includes(substring))
    },
    action: async (msg: Message) => {
        await msg.reply(await whois())
    }
}]

export default {
    name: 'whois',
    commands,
    messageHandlers,
} as Plugin
