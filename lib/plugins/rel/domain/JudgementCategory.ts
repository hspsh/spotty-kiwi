import './JudgedMember'
import { JudgedMember } from './JudgedMember'

export class JudgementCategory {
    constructor(category: string, judgedMembers: JudgedMember[]) {
        this.category = category
        this.judgedMembers = judgedMembers
    }

    category: string

    judgedMembers: JudgedMember[]

    judge(userId: string, points: number) {
        let foundMember = this.judgedMembers.find(
            (member) => member.userId === userId
        )

        if (!foundMember) {
            foundMember = JudgedMember.createMember(userId)
            this.judgedMembers.push(foundMember)
        }

        foundMember.addPoints(points)
    }

    static create(category: string) {
        return new JudgementCategory(category, [])
    }
}
