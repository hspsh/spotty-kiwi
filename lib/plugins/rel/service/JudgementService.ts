import { JudgingMember } from '../domain/JudgingMember'
import { JudgingMemberRepository } from '../repository/JudgingMemberRepository'

export class JudgementServiceImpl implements JudgementService {
    constructor(public repository: JudgingMemberRepository) {}

    async judge(input: JudgementDTO): Promise<void> {
        await this.repository.inTransaction(async (repository) => {
            let judgingMember = await repository.findById(input.judgingUserID)

            if (!judgingMember) {
                judgingMember = JudgingMember.create(input.judgingUserID)
            }

            judgingMember.judge(
                input.judgedUserID,
                input.category,
                input.points
            )

            await repository.save(judgingMember)
        })
    }

    async retrieveJudgementPoints(
        input: RetrieveJudgementDTO
    ): Promise<number> {
        const judgingMember = await this.repository.findById(
            input.judgingUserID
        )

        if (!judgingMember) {
            throw new Error('No such judging member')
        }

        return judgingMember
            .findCategory(input.category)
            .findMember(input.judgedUserID).points
    }
}

export interface JudgementService {
    judge(input: JudgementDTO): Promise<void>
    retrieveJudgementPoints(input: RetrieveJudgementDTO): Promise<number>
}

export interface JudgementDTO {
    judgingUserID: string
    category: string
    judgedUserID: string
    points: number
}

export interface RetrieveJudgementDTO {
    judgingUserID: string
    category: string
    judgedUserID: string
}
