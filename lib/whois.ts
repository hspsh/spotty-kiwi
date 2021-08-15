import axios from 'axios'
import config from '../config'

import { polishPlurals } from 'polish-plurals'

const pluralize = (a: string, b: string, c: string) => (x: number) => polishPlurals(a, b, c, x)

const personPlural = pluralize('osoba', 'osoby', 'osób')
const existPlural = pluralize('jest', 'są', 'jest')
const devicePlural = pluralize('urządzenie', 'urządzenia', 'urządzeń')
const anonymousPlural = pluralize('anonimowe', 'anonimowe', 'anonimowych')

const getWhois = async () : Promise<string> => {
    const { data } = (await axios.get(`${config.WHOIS_API}/now`))
    const { headcount, users, unknown_devices: unknownDevices } = data

    if (headcount > 0) {
        const userList = users.join(', ')

        const exists = existPlural(headcount)
        const person = personPlural(headcount)
        const anonymous = anonymousPlural(unknownDevices)
        const device = devicePlural(unknownDevices)

        return `W spejsie ${exists} ${headcount} ${person}: ${userList} oraz ${unknownDevices} ${anonymous} ${device}.`        
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

export default getWhois
