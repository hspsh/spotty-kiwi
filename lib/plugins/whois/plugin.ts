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
        if (msg.content.includes('kto jest')) {
            return true
        } else {
            return false
        }
    },
    action: async (msg: Message) => {
        await msg.reply({
            content: "ktoś pewnie",
        })
    }
}]

export default {
    name: 'whois',
    commands,
    messageHandlers,
} as Plugin
