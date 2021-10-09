import config from './config'
import logger from './logger'


import { Client, Intents, Message } from 'discord.js'
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

        try {
            let handled = false
            for (const command of pluginManager.commands) {
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

    client.on('messageCreate', async interaction => {
        for (const handler of pluginManager.messageHandlers) {
            if (await handler.predicate(interaction)) {
                handler.action(interaction)
                break
            }
        }
    })

    client.login(config.env.BOT_TOKEN)
}
