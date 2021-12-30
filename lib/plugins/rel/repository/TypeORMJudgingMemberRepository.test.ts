import { beforeEach, afterEach, describe, expect, it } from '@jest/globals'
import fs from "fs"
import { createConnection, Connection } from 'typeorm'
import { JudgedMember } from '../domain/JudgedMember'
import { JudgementCategory } from '../domain/JudgementCategory'
import { JudgingMember } from '../domain/JudgingMember'
import { JudgingMemberRepository } from './JudgingMemberRepository'
import { TypeORMJudgingMemberRepository } from './TypeORMJudgingMemberRepository'

describe('given connection', () => {
    let connection: Connection

    beforeEach(async () => {
        connection = await createConnection({
            type: 'sqlite',
            database: './test.db',
            entities: [JudgedMember, JudgementCategory, JudgingMember],
            logging: ["log"]
        })
        await connection.synchronize()
    })

    afterEach(async () => {
        await connection.dropDatabase()
        await connection.close()
        await fs.promises.rm("test.db") 
    })

    it('smoke test', () => {})

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
