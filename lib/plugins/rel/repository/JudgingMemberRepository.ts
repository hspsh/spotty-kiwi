import { JudgingMember } from '../domain/JudgingMember'

export interface JudgingMemberRepository {
    findById(userId: string): Promise<JudgingMember | undefined>
    save(judgingMember: JudgingMember): Promise<JudgingMember>
}
