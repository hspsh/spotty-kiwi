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

const MATCH_STRINGS = [
    'kto jest',
    'jest ktoś'
]

const messageHandlers: MessageHanlder[] = [{
    predicate: async (msg: Message) => {
        return MATCH_STRINGS.some(s => msg.content.toLowerCase().includes(s))
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
