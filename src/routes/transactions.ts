import { randomUUID } from 'node:crypto'

import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../database'
import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'

export async function transactionRoutes(app: FastifyInstance) {
    app.get(
        '/',
        { preHandler: [checkIfSessionIdExists] },
        async (request, reply) => {
            const { sessionId } = request.cookies

            const transactions = await knex('transactions')
                .where({ session_id: sessionId })
                .select()

            return reply.status(200).send(transactions)
        },
    )

    app.get(
        '/balance',
        { preHandler: [checkIfSessionIdExists] },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const balance = await knex('transactions')
                .where({ session_id: sessionId })
                .sum('amount', { as: 'amount' })
                .first()

            return reply.status(200).send({ balance })
        },
    )

    app.get(
        '/:id',
        { preHandler: [checkIfSessionIdExists] },
        async (request, reply) => {
            const { sessionId } = request.cookies
            const getTransactionSchema = z.object({
                id: z.string().uuid(),
            })

            const { id } = getTransactionSchema.parse(request.params)

            const transaction = await knex('transactions')
                .where({ id, session_id: sessionId })
                .first()

            if (!transaction) {
                return reply.status(404).send()
            }

            return reply.status(200).send(transaction)
        },
    )

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

        let sessionId = request.cookies.sessionId

        if (!sessionId) {
            sessionId = randomUUID()

            const sevenDaysInSeconds = 60 * 60 * 24 * 7

            reply.cookie('sessionId', sessionId, {
                path: '/',
                maxAge: sevenDaysInSeconds,
            })
        }

        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: amountToReturnObject[type],
            session_id: sessionId,
        })

        return reply.status(201).send()
    })
}
