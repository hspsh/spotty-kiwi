const { getWhois } = require('./whois')

module.exports = [
  {
    name: '/ktohakuje',
    waitMessage: 'Rozpoczynam skanowanie spejsu...',
    handler: async req => getWhois(req.user)
  }
]
