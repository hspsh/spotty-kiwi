const { getWhois } = require('./whois')

module.exports = [
  {
    name: '/ktohakuje',
    waitMessage: 'Rozpoczynam skanowanie spejsu...',
    handler: async _req => getWhois()
  }
]
