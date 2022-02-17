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

        const judgeId = message.author.id
        const judgedId = message.interaction?.user.id || ''
        const judgedUsername = message.interaction?.user.username || ''

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

        await this.respond(message, judgedUsername, points, category)
    }

    matchesMessage(message: Message): boolean {
        const isSentAsReply = !!message.interaction
        const matchesJudgementPattern = this.matchJudgementPattern(message)

        return isSentAsReply && !!matchesJudgementPattern
    }

    matchJudgementPattern(message: Message): [string, string, string] | null {
        const matchesJudgementPattern = message?.content?.match(
            DiscordController.REGEX
        )

        return matchesJudgementPattern as [string, string, string] | null
    }

    async respond(
        message: Message,
        judgedUsername: string,
        points: number,
        category: string
    ): Promise<void> {
        const reply = `Członek ${judgedUsername} posiaga ${points} w kategorii ${category}`
        await message.reply(reply)
    }

    static REGEX = /^([a-zA-Z]+)(\++|-+)$/
}
