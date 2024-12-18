import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
    PORT: z.number({ coerce: true }).positive(),
    DATABASE_URL: z.string(),
    MIGRATION_PATH: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (parsedEnv.success !== true) {
    console.error(
        'There were some problems parsing the env for the application',
        parsedEnv.error.format(),
    )

    throw new Error(
        'There were some problems parsing the env for the application',
    )
}

const parsedEnvData = parsedEnv.data

export { parsedEnvData as parsedEnv }
