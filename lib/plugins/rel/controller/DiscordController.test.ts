import { DiscordController } from './DiscordController'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { JudgementService } from '../service/JudgementService'
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

    beforeEach(() => {
        judgementService = {
            judge: jest.fn(async () => undefined),
            retrieveJudgementPoints: jest.fn(async () => 25),
        }

        discordController = new DiscordController(judgementService)
    })

    it("when @cringebit sends 'cringe+++' replying to @user then judges by 3 and sends message", async () => {
        const messageHook = jest.fn(
            /* eslint-disable */
            async (msg: string | MessagePayload | ReplyMessageOptions) =>
                message
        )
        const message: Message = {
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

        expect((judgementService.judge as Mock<any>).mock.calls[0][0]).toEqual(
            expect.objectContaining({
                category: 'cringe',
                points: 3,
                judgedUserID: 'HRSG',
                judgingUserID: 'FDHE',
            })
        )

        expect(
            (judgementService.retrieveJudgementPoints as Mock<any>).mock
                .calls[0][0]
        ).toEqual(
            expect.objectContaining({
                category: 'cringe',
                judgedUserID: 'HRSG',
                judgingUserID: 'FDHE',
            })
        )

        expect(messageHook.mock.calls[0][0]).toEqual(
            'Członek user posiaga 25 w kategorii cringe'
        )
    })
})
/* eslint-enable */
