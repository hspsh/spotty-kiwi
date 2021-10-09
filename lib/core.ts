import config from './config'
import logger from './logger'


import { Client, Intents } from 'discord.js'
import PluginManager from './plugins/pluginManager'

export const run = () : void => {
    logger.info('Starting...')

    const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] })
    const pluginManager = new PluginManager()
    pluginManager.loadPlugins()

    client.on('ready', () => {
        logger.info('Bot is ready.')
    })

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) {
            return
        }

        const logContext = {
            commandName: interaction.commandName,
            user: `${interaction.user.username}#${interaction.user.discriminator}`,
            userId: interaction.user.id,
            options: interaction.command?.options
        }

        logger.info('Handling command.', logContext)

        try {
            let handled = false
            for (const command of pluginManager.commands) {
                if (command.name == interaction.commandName) {
                    command.handle(interaction)
                    handled = true
                    break
                }
            }

            if (!handled) {
                logger.warn('No handler found.', logContext)
            }
        } catch (error) {
            logger.error('An error occurred.', logContext, { error })
        }
    })

    client.on('messageCreate', async interaction => {
        const logContext = {
            messageContent: interaction.content,
            user: `${interaction.author.username}#${interaction.author.discriminator}`,
            userId: interaction.author.id,
        }

        try {
            for (const handler of pluginManager.messageHandlers) {
                if (await handler.predicate(interaction)) {
                    logger.info('Handling message.', logContext)
                    handler.action(interaction)
                    break
                }
            }
        } catch (error) {
            logger.error('An error occured while handling the message.', logContext, { error })
        }
    })

    client.login(config.env.BOT_TOKEN)
}
