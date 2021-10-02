import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { CommandInteraction } from 'discord.js'

import logger from './logger'
import config from './config'
import whois from './whois'

export const refreshCommands = async () : Promise<void> => {
    const client = new REST({ version: '9' }).setToken(config.env.BOT_TOKEN)

    try {
        logger.info('Refreshing slash commands.')

        await client.put(
            Routes.applicationGuildCommands(config.env.APPLICATION_ID, config.env.GUILD_ID),
            { body: commands.map(({ name, description }) => ({ name, description })) }
        )

        logger.info('Updated commands.')
    } catch (error) {
        logger.error(error)
    }
}

type Command = {
    name: string,
    description: string,
    handle: (interaction: CommandInteraction) => Promise<void>
}

const commands : [Command] = [{
    name: 'ktohakuje',
    description: 'Sprawdź kto jest teraz w spejsie',
    handle: async (interaction: CommandInteraction) : Promise<void> => {
        await interaction.reply(await whois())
    }
}]

export default commands
