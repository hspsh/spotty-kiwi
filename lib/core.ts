import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import config from '../config'
import commands from './commands'

export const refreshCommands = async () : Promise<void> => {
    const client = new REST({ version: '9' }).setToken(config.BOT_TOKEN)

    try {
        console.log('Refreshing slash commands')

        await client.put(
            Routes.applicationGuildCommands(config.APPLICATION_ID, config.GUILD_ID),
            { body: commands.map(({ name, description }) => ({ name, description })) }
        )

        console.log('Updated commands')
    } catch (error) {
        console.error(error)
    }
}

import { Client, Intents } from 'discord.js'

export const run = () : void => {
    const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
    client.on('ready', () => {
        console.log('Ready!')
    })

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) {
            return
        }

        // TODO: exceptions, missing commands
        for (const command of commands) {
            if (command.name == interaction.commandName) {
                command.handle(interaction)
                break
            }
        }
    })

    client.login(config.BOT_TOKEN)
}
