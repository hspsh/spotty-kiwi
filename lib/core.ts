import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import config from './config'
import commands from './commands'
import logger from './logger'

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

import { Client, Intents } from 'discord.js'

export const run = () : void => {
    logger.info('Starting...')

    const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

    client.on('ready', () => {
        logger.info('Bot is ready.')
    })

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) {
            return
        }

        try {
            let handled = false
            for (const command of commands) {
                if (command.name == interaction.commandName) {
                    logger.info(`Handling command: ${command.name}`)
                    command.handle(interaction)
                    handled = true
                    break
                }
            }

            if (!handled) {
                logger.warn(`No handler found for ${interaction.commandName}.`)
            }
        } catch (e) {
            logger.error(`An error occurred: ${e}`)
        }
    })

    client.login(config.env.BOT_TOKEN)
}
