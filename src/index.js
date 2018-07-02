const express = require('express')
const bodyParser = require('body-parser')
const { WebClient, RTMClient } = require('@slack/client')

const commands = require('./commands')
const watchers = require('./watchers')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

console.log('Connecting to workspace...')

const client = {
  web: new WebClient(process.env.BOT_TOKEN),
  rtm: new RTMClient(process.env.BOT_TOKEN)
}

console.log('Registering command handlers...')
commands.forEach(command => {
  app.post(command.name, (req, res) => {
    command.handler(req.body).then(response => {
      if (typeof response !== 'undefined') {
        client.web.chat.postMessage({
          channel: req.body.channel_id,
          text: response
        })
      }
    })

    res.send(command.waitMessage)
  })
})

app.listen(process.env.PORT)

client.rtm.start()

console.log('Registering watchers...')

watchers.forEach(watcher => {
  client.rtm.on('message', message => {
    if (watcher.types.includes(message.subtype)) {
      if (watcher.trigger(message)) {
        watcher.handle(message, client)
      }
    }
  })
})

console.log('Up and running!')
