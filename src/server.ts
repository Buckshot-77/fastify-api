import fastify from 'fastify'
import { parsedEnv } from './utils/env'

const app = fastify()

app.get('/hello', () => {
    return 'Hello World'
})

app.listen({ port: parsedEnv.PORT }, () => {
    console.log(`App listening on port ${parsedEnv.PORT}`)
})
