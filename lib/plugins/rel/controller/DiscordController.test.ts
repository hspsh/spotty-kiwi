/* eslint-disable @typescript-eslint/no-unused-vars */
import { DiscordController } from './DiscordController'
import { beforeEach, afterEach, describe, expect, it, jest } from '@jest/globals'
import {
    Message,
    MessageInteraction,
    MessagePayload,
    ReplyMessageOptions,
    User,
} from 'discord.js'
import { JudgedMemberForCategory } from '../domain/JudgedMemberForCategory'
import { JudgementCategory } from '../domain/JudgementCategory'
import { JudgingMember } from '../domain/JudgingMember'
import { Connection, createConnection } from 'typeorm'
import { TypeORMJudgingMemberRepository } from '../repository/TypeORMJudgingMemberRepository'
import {
    JudgementService,
    JudgementServiceImpl,
} from '../service/JudgementService'

describe('given DiscordController', () => {
    let connection: Connection

    let discordController: DiscordController
    let judgementService: JudgementService

    beforeEach(async () => {
        connection = await createConnection({
            type: 'sqlite',
            database: ':memory:',
            entities: [
                JudgedMemberForCategory,
                JudgementCategory,
                JudgingMember,
            ],
            logging: ['log'],
        })
        await connection.synchronize()

        judgementService = new JudgementServiceImpl(
            new TypeORMJudgingMemberRepository(connection.manager)
        )

        discordController = new DiscordController(judgementService)
    })

    afterEach(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it("given already 1 point on @user cringe when @cringebit sends 'cringe+++' replying to @user then judges him to 4 points and sends message", async () => {
        await judgementService.judge({
            judgingUserID: 'A',
            category: 'cringe',
            judgedUserID: 'B',
            points: 1
        })

        const messageHook = jest.fn(async (_: string) => message)
        const message = {
            content: 'cringe+++',
            author: { id: 'A' } as User,
            fetchReference: async () =>
                ({
                    author: {
                        id: 'B',
                        username: 'user',
                    },
                } as Message),
            reply: messageHook as (
                msg: string | MessagePayload | ReplyMessageOptions
            ) => Promise<Message>,
        } as Message

        await discordController.onMessage(message)

        expect(messageHook.mock.calls[0][0]).toContain('4')
        expect(messageHook.mock.calls[0][0]).toContain('cringe')
    })

    it("given already 1 point on @user cringe when @cringebit sends 'Cringe--' replying to @user then judges him to -1 point (ignoring case) and sends message", async () => {
        await judgementService.judge({
            judgingUserID: 'A',
            category: 'cringe',
            judgedUserID: 'B',
            points: 1
        })

        const messageHook = jest.fn(async (_: string) => message)
        const message = {
            content: 'Cringe--',
            author: { id: 'A' } as User,
            fetchReference: async () =>
                ({
                    author: {
                        id: 'B',
                        username: 'user',
                    },
                } as Message),
            reply: messageHook as (
                msg: string | MessagePayload | ReplyMessageOptions
            ) => Promise<Message>,
        } as Message

        await discordController.onMessage(message)

        expect(messageHook.mock.calls[0][0]).toContain('-1')
        expect(messageHook.mock.calls[0][0]).toContain('cringe')
    })
})
/* eslint-enable */
