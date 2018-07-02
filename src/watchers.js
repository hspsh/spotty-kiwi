const { getWhois } = require('./whois')
const { removeDiacritics } = require('./util')

const substringTrigger = strings => message =>
  strings.some(string =>
    removeDiacritics(message.text.toLowerCase()).includes(string))

module.exports = [
  {
    types: [undefined],
    trigger: substringTrigger(['jest ktoś', 'ktoś jest']),
    handle: (message, client) => {
      getWhois().then(response => {
        client.rtm.sendMessage(response, message.channel)
      })
    }
  }
]
