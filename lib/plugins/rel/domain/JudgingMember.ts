import { Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { JudgementCategory } from './JudgementCategory'

@Entity()
export class JudgingMember {
    constructor(userId: string) {
        this.userId = userId
    }

    @PrimaryColumn()
    userId: string

    @OneToMany(() => JudgementCategory, (category) => category.judgingMember, {
        cascade: true,
        eager: true,
    })
    judgementCategories?: JudgementCategory[]

    judge(judgedUserId: string, category: string, points: number): void {
        category = category.toLowerCase()

        if (!this.judgementCategories) {
            this.judgementCategories = []
        }

        let judgementCategory = this.judgementCategories.find(
            (judgementCategory) => judgementCategory.category === category
        )

        if (!judgementCategory) {
            judgementCategory = JudgementCategory.create(category, this)
            this.judgementCategories.push(judgementCategory)
        }

        judgementCategory.judge(judgedUserId, points)
    }

    findCategory(category: string): JudgementCategory {
        category = category.toLowerCase()

        const foundCategory = this.judgementCategories?.find(
            (judgementCategory) => judgementCategory.category === category
        )

        if (!foundCategory) {
            throw new Error('No such category for given user')
        }

        return foundCategory
    }

    static create(userId: string): JudgingMember {
        return new JudgingMember(userId)
    }
}
