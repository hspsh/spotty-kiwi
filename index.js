const express = require('express')
const bodyParser = require('body-parser')
const { WebClient } = require('@slack/client')

const commands = require('./commands')

const app = express()

const client = new WebClient(process.env.BOT_TOKEN)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

commands.forEach(command => {
  app.post(command.name, (req, res) => {
    command.handler(req.body).then(response => {
      if (typeof response !== 'undefined') {
        client.chat.postMessage({
          channel: req.body.channel_id,
          text: response
        })
      }
    })
    
    res.send(command.waitMessage)
  })
})


app.listen(process.env.PORT)

console.log('Listening')