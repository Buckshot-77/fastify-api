import { Knex, knex as setupKnex } from 'knex'

const knexConfig: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: './tmp/app.db',
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './db/migrations',
    },
}

const knex = setupKnex(knexConfig)

export { knex, knexConfig }
