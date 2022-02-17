import { JudgingMember } from '../domain/JudgingMember'

export interface JudgingMemberRepository {
    findById(userId: string): Promise<JudgingMember | undefined>
    save(judgingMember: JudgingMember): Promise<JudgingMember>
    inTransaction<T>(
        runnable: (
            inTransactionRepository: JudgingMemberRepository
        ) => Promise<T>
    ): Promise<T>
}
