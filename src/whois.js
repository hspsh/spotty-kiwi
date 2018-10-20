const axios = require('axios')

const formatStatus = (data, user) => {
  const mention = `<@${user}>`

  if (data.headcount === 0) {
    return `${mention}, Hackerspace jest oficjalnie pusty, natomiast jest ${data.unknown_devices} anonimowych urządzeń.`
  }

  if (data.headcount === 1) {
    return `${mention}, w spejsie jest jedna osoba: ${data.users[0]} oraz ${data.unknown_devices} anonimowych urządzeń.`
  }

  // TODO: extract pluralization logic
  const units = data.headcount % 10
  const [verb, noun] = units >= 2 && units <= 4
    ? ['są', 'osoby']
    : ['jest', 'osób']

  return `${mention}, w spejsie ${verb} ${data.headcount} ${noun}:` +
    ` ${data.users.join(', ')} oraz ${data.unknown_devices} anonimowych urządzeń.`
}

const getWhois = async user => {
  const data = (await axios.get('https://whois.at.hs3.pl/api/now')).data
  return formatStatus(data, user)
}

module.exports = {
  getWhois
}
