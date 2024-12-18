import 'dotenv/config'

import { z } from 'zod'

const envSchema = z.object({
    PORT: z.number({ coerce: true }).positive(),
    DATABASE_URL: z.string(),
    MIGRATION_PATH: z.string(),
})

const parsedEnv = envSchema.safeParse(process.env)

if (parsedEnv.success !== true) {
    throw new Error(
        `There were some problems parsing the env for the application: ${parsedEnv.error}`,
    )
}

const parsedEnvData = parsedEnv.data

export { parsedEnvData as parsedEnv }
