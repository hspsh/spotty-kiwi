import config from './config'
import logger from './logger'

import { Client, Intents, Interaction, Message } from 'discord.js'
import PluginManager from './plugins/pluginManager'

export const run = async (): Promise<void> => {
    logger.info('Starting...')

    const client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGES,
        ],
    })
    const pluginManager = await PluginManager.create()

    client.on('ready', () => {
        logger.info('Bot is ready.')
    })

    client.on('interactionCreate', async (interaction: Interaction) => {
        pluginManager.handleInteraction(interaction)
    })

    client.on('messageCreate', async (interaction: Message) => {
        pluginManager.handleMessage(interaction)
    })

    client.login(config.env.BOT_TOKEN)
}
