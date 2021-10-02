import logger from './logger'

const requiredEnvs = [
    'BOT_TOKEN',
    'APPLICATION_ID',
    'GUILD_ID',
    'WHOIS_API',
]

type Config = {
    env: {
        [key: string] : string
    }
}

const loadEnvs = (names: string[]): Config  => {
    const config: Config = { env: {} }
    const missingEnvs = []

    for (const name of names) {
        const value = process.env[name]

        if (value === '' || typeof value === 'undefined') {
            missingEnvs.push(name)
        } else {
            config.env[name] = value
        }
    }

    if (missingEnvs.length > 0) {
        logger.error(`Missing variables: ${missingEnvs.join(', ')}`)
        process.exit(1)
    }

    return config
}

const config = loadEnvs(requiredEnvs)

export default config
