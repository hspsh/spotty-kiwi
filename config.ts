const config  = {
    BOT_TOKEN: process.env['BOT_TOKEN'],
    APPLICATION_ID: process.env['APPLICATION_ID'],
    GUILD_ID: process.env['GUILD_ID'],
    WHOIS_API: process.env['WHOIS_API'],
} as { [key: string] : string }

export default config
