import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import './JudgedMember'
import { JudgedMember } from './JudgedMember'
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

    @OneToMany(() => JudgedMember, (member) => member.judgementCategory, {
        cascade: true,
        eager: true,
    })
    judgedMembers?: JudgedMember[]

    judge(userId: string, points: number): void {
        if (!this.judgedMembers) {
            this.judgedMembers = []
        }

        let foundMember = this.judgedMembers.find(
            (member) => member.userId === userId
        )

        if (!foundMember) {
            foundMember = JudgedMember.createMember(userId, this)
            this.judgedMembers.push(foundMember)
        }

        foundMember.addPoints(points)
    }

    static create(
        category: string,
        judgingMember: JudgingMember
    ): JudgementCategory {
        return new JudgementCategory(category, judgingMember)
    }
}
