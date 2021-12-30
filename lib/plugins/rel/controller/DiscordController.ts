import { Message } from 'discord.js'
import { JudgementService } from '../service/JudgementService'

export class DiscordController {
    constructor(public judgementService: JudgementService) {}

    async onMessage(message: Message): Promise<void> {
        if (!this.matchesMessage(message)) {
            return
        }

        const [, category, actionLiteral]: [string, string, string] =
            message.content.match(DiscordController.REGEX) as [
                string,
                string,
                string
            ]
        const pointsToAdd = actionLiteral.length

        const judgeId: string = this.extractJudgeId(message)
        const judgedId: string = this.extractJudgedId(message) || ''
        const judgedUsername: string = this.extractJudgedUsername(message) || ''

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
        const matchesJudgementPattern = !!message?.content?.match(
            DiscordController.REGEX
        )

        return isSentAsReply && matchesJudgementPattern
    }

    extractJudgeId(message: Message): string {
        return message.author.id
    }

    extractJudgedId(message: Message): string | undefined {
        return message.interaction?.user.id
    }

    extractJudgedUsername(message: Message): string | undefined {
        return message.interaction?.user.username
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
