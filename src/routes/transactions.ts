import { randomUUID } from 'node:crypto'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'

export async function transactionRoutes(app: FastifyInstance) {
    app.post('/', async (request, reply) => {
        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['debit', 'credit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(
            request.body,
        )

        const amountToReturnObject = {
            credit: amount,
            debit: amount * -1,
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: amountToReturnObject[type],
        })

        return reply.status(201).send()
    })
}
