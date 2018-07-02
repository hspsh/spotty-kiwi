const { getWhois } = require('./whois')
const { removeDiacritics } = require('./util')

const substringTrigger = strings => message =>
  strings.some(string =>
    message.text.toLowerCase().includes(string))

module.exports = [
  {
    types: [undefined],
    trigger: substringTrigger(['jest ktoś', 'ktoś jest', 'kto jest']),
    handle: (message, client) => {
      getWhois(message.user).then(response => {
        client.rtm.sendMessage(response, message.channel)
      })
    }
  }
]
