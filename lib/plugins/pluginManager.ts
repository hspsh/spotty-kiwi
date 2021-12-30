import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'
import { CommandInteraction, Interaction, Message } from 'discord.js'

import logger from '../logger'
import config from '../config'

import whoisPlugin from './whois/plugin'
import { PluginFactory as JudgementPluginFactory } from './rel/plugin'

export type Command = {
    name: string
    description: string
    handle: (interaction: CommandInteraction) => Promise<void>
}

export type MessageHanlder = {
    predicate: (message: Message) => Promise<boolean>
    action: (message: Message) => Promise<void>
}

export type Plugin = {
    name: string
    commands: Command[]
    messageHandlers: MessageHanlder[]
}

export default class PluginManager {
    public constructor(public readonly plugins: Plugin[]) {}

    public async refreshCommands(): Promise<void> {
        const client = new REST({ version: '9' }).setToken(config.env.BOT_TOKEN)

        try {
            logger.info('Refreshing slash commands.')

            await client.put(
                Routes.applicationGuildCommands(
                    config.env.APPLICATION_ID,
                    config.env.GUILD_ID
                ),
                {
                    body: this.plugins.flatMap((x) =>
                        x.commands.map(({ name, description }) => ({
                            name,
                            description,
                        }))
                    ),
                }
            )

            logger.info('Updated commands.')
        } catch (error) {
            logger.error(error)
        }
    }

    public async handleInteraction(interaction: Interaction): Promise<void> {
        if (!interaction.isCommand()) {
            return
        }

        const logContext = {
            commandName: interaction.commandName,
            user: `${interaction.user.username}#${interaction.user.discriminator}`,
            userId: interaction.user.id,
            options: interaction.command?.options,
        }

        logger.info('Handling command.', logContext)

        const foundMatchingCommand = this.plugins
            .flatMap((plugin) => plugin.commands)
            .find((command) => command.name == interaction.commandName)

        if (!foundMatchingCommand) {
            logger.warn('No handler found.', logContext)
            return
        }

        try {
            logger.info('Handling message.', logContext)
            foundMatchingCommand.handle(interaction)
        } catch (error) {
            logger.error('An error occurred.', logContext, { error })
        }
    }

    public async handleMessage(interaction: Message): Promise<void> {
        const logContext = {
            messageContent: interaction.content,
            user: `${interaction.author.username}#${interaction.author.discriminator}`,
            userId: interaction.author.id,
        }

        const messageHandler = this.plugins
            .flatMap((plugin) => plugin.messageHandlers)
            .find((handler) => handler.predicate(interaction))

        if (!messageHandler) {
            return
        }

        logger.info('Handling message.', logContext)

        try {
            logger.info('Handling message.', logContext)
            messageHandler.action(interaction)
        } catch (error) {
            logger.error(
                'An error occured while handling the message.',
                logContext,
                { error }
            )
        }
    }

    static async create(): Promise<PluginManager> {
        return new PluginManager([
            whoisPlugin,
            await new JudgementPluginFactory().createPlugin(
                '/var/db/sqlite.db'
            ),
        ])
    }
}
