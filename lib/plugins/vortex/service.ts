import { EmbedBuilder } from 'discord.js';
import axios from 'axios'

import MQTT from "async-mqtt";

const client = MQTT.connect("tcp://mqtt.hack:1883")
client.subscribe('homie')
client.on('message', function (topic: string, message: string) {
  console.log(topic, message)
  if (topic.endsWith('$localIP')) {
    
  }
})

const NODES = ['vortex-cam-1', 'vortex-cam-2', 'vortex-cam-3']
const deviceIps = {

}

const getStatus = async (): Promise<object> => {
    
    deviceIp = 

    const jpg = await axios.get(
        `http://${deviceIp}/capture`
    )
    Promise.all(NODES.map((nodeId) => {

    })).then((values) => {
        console.log(values);
      });


    // inside a command, event listener, etc.
    const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

    return { embeds: [exampleEmbed] };
}


export default {
    getStatus,
}
