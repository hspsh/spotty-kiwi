import { Connection } from 'typeorm'
import { createConnection } from 'typeorm'
import { DiscordController } from './controller/DiscordController'

import { JudgedMember } from './domain/JudgedMember'
import { JudgementCategory } from './domain/JudgementCategory'
import { JudgingMember } from './domain/JudgingMember'
import { JudgementServiceImpl } from './service/JudgementService'
import { TypeORMJudgingMemberRepository } from './repository/TypeORMJudgingMemberRepository'

import { Plugin } from '../pluginManager'
import { Message } from 'discord.js'

export class PluginFactory {
    async createPlugin(dbPath: string): Promise<Plugin> {
        const connection = await this.createConnection(dbPath)
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
                    predicate: async (msg) => controller.matchesMessage(msg),
                },
            ],
        }
    }

    async createConnection(forDBPath: string): Promise<Connection> {
        const connection = await createConnection({
            type: 'sqlite',
            database: forDBPath,
            entities: [JudgedMember, JudgementCategory, JudgingMember],
            logging: ['log'],
        })
        await connection.synchronize()
        return connection
    }
}
