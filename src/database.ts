import { Knex, knex as setupKnex } from 'knex'

import { parsedEnv } from './utils/env'

const knexConfig: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: parsedEnv.DATABASE_URL,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: parsedEnv.MIGRATION_PATH,
    },
}

const knex = setupKnex(knexConfig)

export { knex, knexConfig }
