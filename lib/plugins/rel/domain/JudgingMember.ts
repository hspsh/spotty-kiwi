import { Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { JudgementCategory } from './JudgementCategory'

@Entity()
export class JudgingMember {
    constructor(userId: string) {
        this.userId = userId
    }

    @PrimaryColumn()
    userId: string

    @OneToMany(() => JudgementCategory, (category) => category.judgingMember, {cascade: true, eager: true})
    judgementCategories?: JudgementCategory[]

    judge(judgedUserId: string, category: string, points: number) {
        if(!this.judgementCategories){
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

    static create(userId: string) {
        return new JudgingMember(userId)
    }
}
