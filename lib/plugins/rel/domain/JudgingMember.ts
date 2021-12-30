import './JudgedMember'
import { JudgementCategory } from './JudgementCategory'

export class JudgingMember {
    constructor(userId: string, judgementCategories: JudgementCategory[]) {
        this.userId = userId
        this.judgementCategories = judgementCategories
    }

    userId: string

    judgementCategories: JudgementCategory[]

    judge(judgedUserId: string, category: string, points: number) {
        let judgementCategory = this.judgementCategories.find(
            (judgementCategory) => judgementCategory.category === category
        )

        if (!judgementCategory) {
            judgementCategory = JudgementCategory.create(category)
            this.judgementCategories.push(judgementCategory)
        }

        judgementCategory.judge(judgedUserId, points)
    }

    static create(userId: string) {
        return new JudgingMember(userId, [])
    }
}
