import { Message } from 'discord.js'
import { JudgementService } from '../service/JudgementService'

export class DiscordController {
    constructor(public judgementService: JudgementService) {}

    async onMessage(message: Message): Promise<void> {
        const matchedJudgementPattern = this.matchJudgementPattern(message)

        if (!matchedJudgementPattern) {
            return
        }

        const [, category, actionLiteral]: [string, string, string] =
            matchedJudgementPattern

        const pointsToAdd =
            actionLiteral.length * (actionLiteral[0] === '+' ? 1 : -1)

        const referencedMessage = await message.fetchReference()

        const judgeId = message.author.id
        const judgeUsername = message.author.username
        const judgedId = referencedMessage?.author.id || ''
        const judgedUsername = referencedMessage?.author.username || ''

        await this.judgementService.judge({
            judgingUserID: judgeId,
            category: category,
            judgedUserID: judgedId,
            points: pointsToAdd,
        })

        const points = await this.judgementService.retrieveJudgementPoints({
            judgingUserID: judgeId,
            judgedUserID: judgedId,
            category: category,
        })

        await this.respond(
            message,
            judgeUsername,
            judgedUsername,
            points,
            category
        )
    }

    async matchesMessage(message: Message): Promise<boolean> {
        const isSentAsReply = !!message.reference
        const matchesJudgementPattern = !!this.matchJudgementPattern(message)

        return isSentAsReply && matchesJudgementPattern
    }

    matchJudgementPattern(message: Message): [string, string, string] | null {
        const matchesJudgementPattern = message?.content?.match(
            DiscordController.REGEX
        )

        return matchesJudgementPattern as [string, string, string] | null
    }

    async respond(
        message: Message,
        judgingUsername: string,
        judgedUsername: string,
        points: number,
        category: string
    ): Promise<void> {
        const reply = `"${judgingUsername}".**${category.toLowerCase()}**("${judgedUsername}") == ${points}`
        await message.reply(reply)
    }

    static REGEX = /^([a-zA-Z]ඞ+)(\++|-+)$/
}
