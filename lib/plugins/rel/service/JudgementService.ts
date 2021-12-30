import { JudgingMember } from '../domain/JudgingMember'
import { JudgingMemberRepository } from '../repository/JudgingMemberRepository'

export class JudgementService {
    constructor(public repository: JudgingMemberRepository) {}

    async judge(judgement: JudgementDTO): Promise<void> {
        let judgingMember = await this.repository.findById(
            judgement.judgingUserID
        )

        if (!judgingMember) {
            judgingMember = new JudgingMember(judgement.judgingUserID)
        }

        judgingMember.judge(
            judgement.judgingUserID,
            judgement.category,
            judgement.points
        )

        await this.repository.save(judgingMember)
    }
}

export interface JudgementDTO {
    judgingUserID: string
    category: string
    judgedUserID: string
    points: number
}
