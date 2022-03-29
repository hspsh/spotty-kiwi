import { EntityManager } from 'typeorm'
import { JudgingMember } from '../domain/JudgingMember'
import { JudgingMemberRepository } from './JudgingMemberRepository'

export class TypeORMJudgingMemberRepository implements JudgingMemberRepository {
    constructor(public manager: EntityManager) {}

    findById(userId: string): Promise<JudgingMember | undefined> {
        return this.manager.findOne(JudgingMember, userId)
    }

    save(judgingMember: JudgingMember): Promise<JudgingMember> {
        return this.manager.save(judgingMember)
    }

    async inTransaction<T>(
        runnable: (
            inTransactionRepository: JudgingMemberRepository
        ) => Promise<T>
    ): Promise<T> {
        return this.manager.transaction((entityManager) =>
            runnable(new TypeORMJudgingMemberRepository(entityManager))
        )
    }
}
