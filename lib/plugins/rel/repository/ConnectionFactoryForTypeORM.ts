import { Connection, createConnection } from 'typeorm'
import { JudgedMemberForCategory } from '../domain/JudgedMemberForCategory'
import { JudgementCategory } from '../domain/JudgementCategory'
import { JudgingMember } from '../domain/JudgingMember'
import { SetUp1645131484141 } from '../migrations/1645131484141-SetUp'

export async function createTypeORMConnection(
    forDBPath: string
): Promise<Connection> {
    const connection = await createConnection({
        type: 'sqlite',
        database: forDBPath,
        entities: [JudgedMemberForCategory, JudgementCategory, JudgingMember],
        logging: ['log'],
        migrations: [SetUp1645131484141],
    })
    await connection.runMigrations()
    return connection
}
