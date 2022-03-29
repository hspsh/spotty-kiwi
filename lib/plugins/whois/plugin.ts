import { CommandInteraction, Message, TextChannel } from 'discord.js'

import { Plugin, Command, MessageHandler } from '../pluginManager'
import whois from './api'

const commands: Command[] = [
    {
        name: 'ktohakuje',
        description: 'Sprawdź kto jest teraz w spejsie',
        handle: async (interaction: CommandInteraction): Promise<void> => {
            await interaction.reply(await whois())
        },
    },
]

const MATCH_STRINGS = ['kto jest', 'jest ktoś']

const WATCHED_CHANNELS = ['drzwi']

const messageHandlers: MessageHandler[] = [
    {
        predicate: async (msg: Message) => {
            return (
                WATCHED_CHANNELS.some(
                    (channel) => (msg.channel as TextChannel).name == channel
                ) &&
                MATCH_STRINGS.some((s) => msg.content.toLowerCase().includes(s))
            )
        },
        action: async (msg: Message) => {
            await msg.reply(await whois())
        },
    },
]

export default {
    name: 'whois',
    commands,
    messageHandlers,
} as Plugin
