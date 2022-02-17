/* eslint-disable @typescript-eslint/no-unused-vars */
import { DiscordController } from './DiscordController'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import {
    JudgementDTO,
    JudgementService,
    RetrieveJudgementDTO,
} from '../service/JudgementService'
import {
    Message,
    MessageInteraction,
    MessagePayload,
    ReplyMessageOptions,
    User,
} from 'discord.js'
import { Mock } from 'jest-mock'

describe('given DiscordController', () => {
    let discordController: DiscordController
    let judgementService: JudgementService

    let judgeMock: Mock<Promise<undefined>, [JudgementDTO]>
    let retrieveJudgementPointsMock: Mock<
        Promise<number>,
        [RetrieveJudgementDTO]
    >

    beforeEach(() => {
        judgeMock = jest.fn(async (_) => undefined)
        retrieveJudgementPointsMock = jest.fn(async (_) => 25)
        judgementService = {
            judge: judgeMock,
            retrieveJudgementPoints: retrieveJudgementPointsMock,
        }

        discordController = new DiscordController(judgementService)
    })

    it("when @cringebit sends 'cringe+++' replying to @user then judges by 3 and sends message", async () => {
        const messageHook = jest.fn(async (_: string) => message)
        const message = {
            content: 'cringe+++',
            author: { id: 'FDHE' } as User,
            interaction: {
                user: {
                    id: 'HRSG',
                    username: 'user',
                } as User,
            } as MessageInteraction,
            reply: messageHook as (
                msg: string | MessagePayload | ReplyMessageOptions
            ) => Promise<Message>,
        } as Message

        await discordController.onMessage(message)

        expect(judgeMock.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                category: 'cringe',
                points: 3,
                judgedUserID: 'HRSG',
                judgingUserID: 'FDHE',
            })
        )

        expect(retrieveJudgementPointsMock.mock.calls[0][0]).toEqual(
            expect.objectContaining({
                category: 'cringe',
                judgedUserID: 'HRSG',
                judgingUserID: 'FDHE',
            })
        )

        expect(messageHook.mock.calls[0][0]).toContain('25')
        expect(messageHook.mock.calls[0][0]).toContain('cringe')
    })
})
/* eslint-enable */
