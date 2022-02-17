import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class SetUp1645131484141 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'judging_member',
                columns: [
                    {
                        name: 'userId',
                        type: 'string',
                        isPrimary: true,
                        length: '64',
                    },
                ],
            })
        )

        await queryRunner.createTable(
            new Table({
                name: 'judgement_category',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isNullable: false,
                    },
                    {
                        name: 'category',
                        type: 'string',
                    },
                    {
                        name: 'judgingMemberUserId',
                        type: 'string',
                        length: '64',
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['judgingMemberUserId'],
                        referencedTableName: 'judging_member',
                        referencedColumnNames: ['userId'],
                    },
                ],
                indices: [{
                    name: "judgingMemberUserIdIndex",
                    columnNames: ["judgingMemberUserId"]
                }]
            })
        )

        await queryRunner.createTable(
            new Table({
                name: "judged_member_for_category",
                columns: [{
                    name: 'id',
                    type: 'integer',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    isNullable: false,
                }, {
                    name: 'userId',
                    type: 'string',
                    length: '64',
                }, {
                    name: 'points',
                    type: 'int'
                }, {
                    name: 'judgementCategoryId',
                    type: 'int'
                }],
                foreignKeys: [{
                    columnNames: ["judgementCategoryId"],
                    referencedTableName: 'judgement_category',
                    referencedColumnNames: ['id']
                }],
                indices: [{
                    name: "userIdIndex",
                    columnNames: ["userId"]
                },{
                    name: "judgementCategoryIdIndex",
                    columnNames: ["judgementCategoryId"]
                }]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable("judging_member")
        queryRunner.dropTable("judgement_category")
        queryRunner.dropTable("judged_member_for_category")
    }
}
