const axios = require('axios')

const getCorrectVerbAndNoun = (amount, zeroVerb, zeroNoun, singularVerb, singularNoun, exceptionalPluralVerb, exceptionalPluralNoun, exceptionalPluralRange=0, typicalPluralVerb, typicalPluralNoun) => {
  if (amount == 0) {
    return [`${zeroVerb}`, `${zeroNoun}`]
  }  else if (amount == 1) {
    return [`${singularVerb}`, `${singularNoun}`]
  } else if (exceptionalPluralRange == 0) {
    return [`${typicalPluralVerb}`, `${typicalPluralNoun}`]
  } else if (amount <= exceptionalPluralRange) {
    return [`${exceptionalPluralVerb}`, `${exceptionalPluralNoun}`]
  }

const formatStatus = (data, user) => {
  const mention = `<@${user}>`
  const [users_verb, users_noun] = getCorrectVerbAndNoun(${data.headcount}, 'jest', 'osób', 'jest', 'osoba', 'są', 'osoby', 4, 'jest', 'osób')
  const [devices_verb, devices_noun] = getCorrectVerbAndNoun(${data.unknown_devices}, 'jest' 'niezidentyfikowanych urządze', 'jest', 'niezidentyfikowane urządzenie', 'są', 'niezidentifikowane urządzenia', 4, 'jest', 'niezidentyfikowanych urządzeń')
  
  return `${mention}, w spejsie ${users_verb} ${data.headcount} ${devices_noun}:` +
    `${data.users.join(', ')} oraz ${devices_verb} ${data.unknown_devices} ${devices_noun}.`
}

const getWhois = async user => {
  const data = (await axios.get('https://whois.at.hs3.pl/api/now')).data
  return formatStatus(data, user)
}

module.exports = {
  getWhois
}
