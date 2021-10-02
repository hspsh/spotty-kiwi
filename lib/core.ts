import config from './config'
import commands from './commands'
import logger from './logger'


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
