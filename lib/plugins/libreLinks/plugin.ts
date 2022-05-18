import { Message } from 'discord.js'
import { MessageHandler, Plugin } from '../pluginManager'

// https://stackoverflow.com/a/3809435/18140793
const URL_REGEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g

const getUrls = (str: string): string[] => {
    const matches = Array.from(str.matchAll(URL_REGEX))
    const urls = matches.map((x) => x[0])
    return urls
}

const isUnsignedInt = (num: string): boolean => {
    for (const char of num) {
        if (!(char >= '0' && char <= '9')) {
            return false
        }
    }

    return true
}

const getNitterLink = (link: string): string | undefined => {
    const url = new URL(link)

    if (url.host != 'twitter.com') {
        return
    }

    const [_, ...pathSegments] = url.pathname.split('/')
    const isProfile = pathSegments.length == 1
    const isStatus =
        pathSegments.length == 3 &&
        pathSegments[1] == 'status' &&
        isUnsignedInt(pathSegments[2])

    if (!isProfile && !isStatus) {
        return
    }

    url.search = ''
    url.host = 'nitter.net'
    url.protocol = 'https'

    return url.toString()
}

const replaceUrls = (urls: string[]): string[] => {
    const replaced: string[] = []

    urls.forEach((url) => {
        const transformed = getNitterLink(url)
        if (transformed !== undefined) {
            replaced.push(transformed)
        }
    })

    return replaced
}

const messageHandlers: MessageHandler[] = [
    {
        predicate: async (_: Message) => true,
        action: async (msg: Message): Promise<void> => {
            const urls = getUrls(msg.content)
            const replaced = replaceUrls(urls)

            if (replaced.length == 0) {
                return
            }

            const response = replaced.join('\n')
            await msg.channel.send(response)
        },
    },
]

const LibreLinksPlugin: Plugin = {
    name: 'libre-links',
    messageHandlers,
    commands: [],
}

export default LibreLinksPlugin
