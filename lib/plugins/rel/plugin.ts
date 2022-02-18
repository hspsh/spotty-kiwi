import { DiscordController } from './controller/DiscordController'

import { JudgementServiceImpl } from './service/JudgementService'
import { TypeORMJudgingMemberRepository } from './repository/TypeORMJudgingMemberRepository'

import { Plugin } from '../pluginManager'
import { Message } from 'discord.js'
import { createTypeORMConnection } from './repository/ConnectionFactoryForTypeORM'

export const JudgementPluginFactory = {
    async createPlugin(dbPath: string): Promise<Plugin> {
        const connection = await createTypeORMConnection(dbPath)
        const controller = new DiscordController(
            new JudgementServiceImpl(
                new TypeORMJudgingMemberRepository(connection.manager)
            )
        )

        return {
            name: 'judgement',
            commands: [],
            messageHandlers: [
                {
                    action: (msg: Message) => controller.onMessage(msg),
                    predicate: (msg) => controller.matchesMessage(msg),
                },
            ],
        }
    },
}
