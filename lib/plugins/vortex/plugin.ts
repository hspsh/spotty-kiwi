import {
    CommandInteraction,
    GuildMember,
    Message,
    TextChannel,
} from 'discord.js'

import { Plugin, Command, MessageHandler } from '../pluginManager'
import service from './service'

const commands: Command[] = [
    {
        name: 'vortex',
        description: 'Sprawdź status "Vortex of Doom"',
        handle: async (interaction: CommandInteraction): Promise<void> => {
            await interaction.reply(await service.getStatus())
        },
    },
]

const messageHandlers: MessageHandler[] = []

export default {
    name: 'vortex',
    commands,
    messageHandlers,
} as Plugin
