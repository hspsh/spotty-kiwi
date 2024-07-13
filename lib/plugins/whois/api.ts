import axios from 'axios'
import config from '../../config'

import { polishPlurals } from 'polish-plurals'

const pluralize = (a: string, b: string, c: string) => (x: number) =>
    polishPlurals(a, b, c, x)

const personPlural = pluralize('osoba', 'osoby', 'osób')
const existPlural = pluralize('jest', 'są', 'jest')
const devicePlural = pluralize('urządzenie', 'urządzenia', 'urządzeń')
const anonymousPlural = pluralize('anonimowe', 'anonimowe', 'anonimowych')

const getWhois = async (): Promise<string> => {
    const { data } = await axios.get(`${config.env.WHOIS_API}/now`)
    const { headcount, users, unknown_devices: unknownDevices } = data

    if (headcount > 0) {
        const userList = users.join(', ')

        const exists = existPlural(headcount)
        const person = personPlural(headcount)

        if (unknownDevices > 0) {
            const anonymous = anonymousPlural(unknownDevices)
            const device = devicePlural(unknownDevices)

            return `W spejsie ${exists} ${headcount} ${person}: ${userList} oraz ${unknownDevices} ${anonymous} ${device}.`
        } else {
            return `W spejsie ${exists} ${headcount} ${person}: ${userList}.`
        }
    }

    if (unknownDevices > 0) {
        const exists = existPlural(unknownDevices)
        const anonymous = anonymousPlural(unknownDevices)
        const device = devicePlural(unknownDevices)

        return `Hackerspace jest oficjalnie pusty, natomiast ${exists} ${anonymous} ${unknownDevices} ${device}.`
    } else {
        return 'Hackerspace jest totalnie pusty.'
    }
}

type MessageGenerator = (person: string, channel: string) => string

/* eslint-disable @typescript-eslint/no-unused-vars */
const messages: [MessageGenerator, number][] = [
    [(person, channel) => `${person} mówi ding-dong na kanale ${channel}`, 2],
    [(person, channel) => `${person} robi puk-puk na kanale ${channel}`, 2],
    [(person, channel) => `${person} robi honk-honk na kanale ${channel}`, 2],
    [
        (person, channel) =>
            `${person} robi cringe-cringe na kanale ${channel}`,
        2,
    ],
    [(person, channel) => `${person} pyta się czy pijemy`, 2],
    [(person, channel) => `${person} nie zapłacił składki w tym miesiącu`, 2],
    [(person, channel) => `${person} dostał kociej mordy`, 2],
    [(person, channel) => `${person} dedosuje huisa na kanale ${channel}`, 2],
    [(person, channel) => `${person} woli windowsa od linuxa`, 2],
    [(person, channel) => `${person} tekst dolny`, 2],
    [(person, channel) => `${person} szanuje papieża na kanale ${channel}`, 2],
    [(person, channel) => `${channel} mówi ding-dong na kanale ${person}`, 2],
    [
        (person, channel) =>
            `${person}; DROP TABLE HACKERS; DROP TABLE CHANNELS; --`,
        4,
    ],
    [(person, channel) => `${person} krindżuje na kanale ${channel}`, 2],
    [
        (person, channel) =>
            `${person} mówi ri,i,i,i,i,i,i na kanale ${channel}`,
        2,
    ],
    [
        (person, channel) =>
            `${person} lubi całować chłopców`,
        1,
    ],
    [(person, channel) => `${person} nie posprzątał po sobie i teraz mu głupio`, 2],
    [(person, channel) => `${person}, ty psuju`, 2],
    [
        (person, channel) => 
            `not7cd robi puk-puk na kanale ${channel}. Żartowałem, to był ${person}`,
        1
    ],
    [(person, channel) => `${person} znowu propaguje lewacką propagande`, 2],
]

const getWeightedRandomMessage = (person: string, channel: string): string => {
    const totalWeight = messages
        .map((message) => message[1])
        .reduce((a, b) => a + b)
    const random = Math.random() * totalWeight
    let pointer = 0

    for (const [message, weight] of messages) {
        pointer += weight
        if (random < pointer) {
            return message(person, channel)
        }
    }

    throw new Error('Unreachable')
}

const reportCringe = async (person: string, channel: string): Promise<void> => {
    const message = getWeightedRandomMessage(person, channel)

    await axios.get(
        `https://cringe.at.hsp.sh/mow/${encodeURIComponent(message)}`
    )
}

export default {
    getWhois,
    reportCringe,
}
