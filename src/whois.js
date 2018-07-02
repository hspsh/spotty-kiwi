const axios = require('axios')

const formatStatus = (data, user) => {
  const mention = `<@${user}>`

  if (data.headcount === 0) {
    return `${mention}, Hackerspace jest pusty`
  }

  if (data.headcount === 1) {
    return `${mention}, w spejsie jest jedna osoba: ${data.users[0]}`
  }

  // TODO: extract pluralization logic
  const units = data.headcount % 10
  const [verb, noun] = units >= 2 && units <= 4
    ? ['są', 'osoby']
    : ['jest', 'osób']
  return `${mention}, w spejsie ${verb} ${data.headcount} ${noun}:\
    ${data.users.join(', ')}`
}

const getWhois = async user => {
  const data = (await axios.get('https://at.hs3.pl/api/now')).data
  return formatStatus(data, user)
}

module.exports = {
  getWhois
}
