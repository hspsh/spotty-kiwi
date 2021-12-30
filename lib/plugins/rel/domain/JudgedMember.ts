import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { JudgementCategory } from './JudgementCategory'

@Entity()
export class JudgedMember {
    constructor(
        userId: string,
        points: number,
        judgementCategory: JudgementCategory
    ) {
        this.userId = userId
        this.points = points
        this.judgementCategory = judgementCategory
    }

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    userId: string

    @Column()
    points: number

    @ManyToOne(() => JudgementCategory, (category) => category.judgingMember)
    judgementCategory: JudgementCategory

    addPoints(amount: number): void {
        this.points += amount
    }

    static createMember(
        userId: string,
        judgementCategory: JudgementCategory
    ): JudgedMember {
        return new JudgedMember(userId, 0, judgementCategory)
    }
}
