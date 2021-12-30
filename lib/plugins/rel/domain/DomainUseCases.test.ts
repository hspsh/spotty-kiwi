import { beforeEach, describe, expect, it } from '@jest/globals'
import { JudgementCategory } from './JudgementCategory'
import { JudgingMember } from './JudgingMember'

describe('given empty judging user', () => {
    let emptyJudgingMember: JudgingMember

    beforeEach(() => {
        emptyJudgingMember = JudgingMember.create('deadbeef')
    })

    it('when user is judged then all is created', () => {
        emptyJudgingMember.judge('Kokoszka', 'cringe', 42)

        emptyJudgingMember.judgementCategories[0].judgedMembers
        expect(emptyJudgingMember).toEqual(
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

    describe('given already judged user', () => {
        beforeEach(() => {
            emptyJudgingMember.judge('Kokoszka', 'cringe', 42)
        })

        it('when new points are added to existing judged user, then it is updated', () => {
            emptyJudgingMember.judge('Kokoszka', 'cringe', 58)

            expect(emptyJudgingMember).toEqual(
                expect.objectContaining({
                    userId: 'deadbeef',
                    judgementCategories: [
                        expect.objectContaining({
                            category: 'cringe',
                            judgedMembers: [
                                expect.objectContaining({
                                    userId: 'Kokoszka',
                                    points: 100,
                                }),
                            ],
                        }),
                    ],
                })
            )
        })

        it('when new user is judged in same category, then it is created', () => {
            emptyJudgingMember.judge('Piesel', 'cringe', 58)

            expect(emptyJudgingMember).toEqual(
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
                                expect.objectContaining({
                                    userId: 'Piesel',
                                    points: 58,
                                }),
                            ],
                        }),
                    ],
                })
            )
        })

        it('when old user in new category is judged, then category is created with separate member', () => {
            emptyJudgingMember.judge('Kokoszka', 'rel', 58)

            expect(emptyJudgingMember).toEqual(
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
                        expect.objectContaining({
                            category: 'rel',
                            judgedMembers: [
                                expect.objectContaining({
                                    userId: 'Kokoszka',
                                    points: 58,
                                }),
                            ],
                        }),
                    ],
                })
            )
        })
    })
})
