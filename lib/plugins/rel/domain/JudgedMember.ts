export class JudgedMember {
    constructor(userId: string, points: number) {
        this.userId = userId
        this.points = points
    }

    userId: string

    points: number

    addPoints(amount: number) {
        this.points += amount
    }

    static createMember(userId: string) {
        return new JudgedMember(userId, 0)
    }
}
