const axios = require('axios')

const formatStatus = data => {
  if (data.headcount === 0) {
    return 'Hackerspace jest pusty'
  }

  if (data.headcount === 1) {
    return `W spejsie jest jedna osoba: ${data.users[0]}`
  }

  // TODO: extract pluralization logic
  const units = data.headcount % 10
  const [verb, noun] = units >= 2 && units <= 4
    ? ['są', 'osoby']
    : ['jest', 'osób']
  return `W spejsie ${verb} ${data.headcount} ${noun}: ${data.users.join(', ')}`
}

const getWhois = async () => {
  const data = (await axios.get('https://at.hs3.pl/api/now')).data
  return formatStatus(data)
}

module.exports = {
  getWhois
}
