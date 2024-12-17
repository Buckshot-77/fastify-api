import { Knex, knex as setupKnex } from 'knex'

const knexConfig: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: './db/app.db',
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
}

const knex = setupKnex(knexConfig)

export { knex, knexConfig }
