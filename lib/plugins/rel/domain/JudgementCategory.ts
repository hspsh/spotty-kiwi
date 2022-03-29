import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import './JudgedMemberForCategory'
import { JudgedMemberForCategory } from './JudgedMemberForCategory'
import { JudgingMember } from './JudgingMember'

@Entity()
export class JudgementCategory {
    constructor(category: string, judgingMember: JudgingMember) {
        this.category = category
        this.judgingMember = judgingMember
    }

    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(() => JudgingMember, (member) => member.judgementCategories)
    judgingMember: JudgingMember

    @Column()
    category: string

    @OneToMany(
        () => JudgedMemberForCategory,
        (member) => member.judgementCategory,
        {
            cascade: true,
            eager: true,
        }
    )
    judgedMembers?: JudgedMemberForCategory[]

    judge(userId: string, points: number): void {
        if (!this.judgedMembers) {
            this.judgedMembers = []
        }

        let foundMember = this.judgedMembers.find(
            (member) => member.userId === userId
        )

        if (!foundMember) {
            foundMember = JudgedMemberForCategory.createMember(userId, this)
            this.judgedMembers.push(foundMember)
        }

        foundMember.addPoints(points)
    }

    findMember(userId: string): JudgedMemberForCategory {
        const foundMember = this.judgedMembers?.find(
            (judgedMember) => judgedMember.userId === userId
        )

        if (!foundMember) {
            throw new Error(`There is no member for given userId: ${userId}`)
        }

        return foundMember
    }

    static create(
        category: string,
        judgingMember: JudgingMember
    ): JudgementCategory {
        return new JudgementCategory(category, judgingMember)
    }
}
