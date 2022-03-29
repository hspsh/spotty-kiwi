import { CommandInteraction, Message, TextChannel } from 'discord.js'

import { Plugin, Command, MessageHandler } from '../pluginManager'
import api from './api'

const commands: Command[] = [
    {
        name: 'ktohakuje',
        description: 'Sprawdź kto jest teraz w spejsie',
        handle: async (interaction: CommandInteraction): Promise<void> => {
            await interaction.reply(await api.getWhois())
            await api.reportCringe(
                interaction.user.username,
                (interaction.channel as TextChannel).name
            )
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
            await msg.reply(await api.getWhois())
            await api.reportCringe(
                msg.author.username,
                (msg.channel as TextChannel).name
            )
        },
    },
]

export default {
    name: 'whois',
    commands,
    messageHandlers,
} as Plugin
