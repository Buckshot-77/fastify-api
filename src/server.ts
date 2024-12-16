import fastify from 'fastify'
import { parsedEnv } from './utils/env'

import { knex } from './database'

const app = fastify()

app.get('/', async () => {
    const tables = await knex('sqlite_schema').select('*')

    return tables
})

app.listen({ port: parsedEnv.PORT }, () => {
    console.log(`App listening on port ${parsedEnv.PORT}`)
})
