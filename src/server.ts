import fastify from 'fastify'

import { parsedEnv } from './utils/env'

import { transactionRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionRoutes, { prefix: 'transactions' })

app.listen({ port: parsedEnv.PORT }, () => {
    console.log(`App listening on port ${parsedEnv.PORT}`)
})
