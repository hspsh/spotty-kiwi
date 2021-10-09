import { lstat, readdir } from 'fs/promises'

import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { CommandInteraction, Message } from 'discord.js'

import logger from '../logger'
import config from '../config'

export type Command = {
    name: string,
    description: string,
    handle: (interaction: CommandInteraction) => Promise<void>
}

export type MessageHanlder = {
    predicate: (message : Message) => Promise<boolean>,
    action: (message : Message) => Promise<void>
}

export type Plugin = {
    name: string
    commands: Command[],
    messageHandlers: MessageHanlder[],
}

export default class PluginManager {
    public constructor(
        public readonly commands : Command[] = [],
        public readonly messageHandlers : MessageHanlder[] = [],
    ) {

    }

    public async loadPlugins() {
        for (const path of await readdir(__dirname)) {
            const fullPath =  `${__dirname}/${path}`
            const stat = await lstat(fullPath)
            if (!stat.isDirectory()) {
                continue
            }

            logger.info(`Loading plugin from ${fullPath}`)
            try {
                const plugin = (await import(`${fullPath}/plugin`)).default as Plugin
                
                logger.info(`Detected plugin '${plugin.name}'`)

                this.commands.push(...plugin.commands)
                this.messageHandlers.push(...plugin.messageHandlers)
            } catch (error) {
                console.log(error)
                logger.error(`Loading plugin from ${fullPath} failed: ${error}`)
            }
        }
    }

    public async refreshCommands() {
        const client = new REST({ version: '9' }).setToken(config.env.BOT_TOKEN)

        try {
            logger.info('Refreshing slash commands.')

            await client.put(
                Routes.applicationGuildCommands(config.env.APPLICATION_ID, config.env.GUILD_ID),
                { 
                    body: this.commands.map(({ name, description }) => ({ name, description })) 
                }
            )

            logger.info('Updated commands.')
        } catch (error) {
            logger.error(error)
        }
    }


}