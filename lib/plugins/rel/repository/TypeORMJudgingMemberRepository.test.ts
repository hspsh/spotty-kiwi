import { beforeEach, afterEach, describe, expect, it } from '@jest/globals'
import { Connection } from 'typeorm'
import { JudgingMember } from '../domain/JudgingMember'
import { createTypeORMConnection } from './ConnectionFactoryForTypeORM'
import { JudgingMemberRepository } from './JudgingMemberRepository'
import { TypeORMJudgingMemberRepository } from './TypeORMJudgingMemberRepository'

describe('given connection', () => {
    let connection: Connection

    beforeEach(async () => {
        connection = await createTypeORMConnection(':memory:')
    })

    afterEach(async () => {
        await connection.close()
    })

    it('smoke test database connection', () => undefined)

    describe('given JudgingMemberRepository', () => {
        let judgingRepository: JudgingMemberRepository

        beforeEach(async () => {
            judgingRepository = new TypeORMJudgingMemberRepository(
                connection.manager
            )
        })

        it('when entity saved, then it can be retrieved', async () => {
            const entity = JudgingMember.create('deadbeef')
            entity.judge('Kokoszka', 'cringe', 42)

            await judgingRepository.save(entity)

            const returnedEntity = await judgingRepository.findById('deadbeef')
            expect(returnedEntity).toEqual(
                expect.objectContaining({
                    userId: 'deadbeef',
                    judgementCategories: [
                        expect.objectContaining({
                            category: 'cringe',
                            judgedMembers: [
                                expect.objectContaining({
                                    userId: 'Kokoszka',
                                    points: 42,
                                }),
                            ],
                        }),
                    ],
                })
            )
        })
    })
})
