import { MessageAttachment, MessageEmbed } from 'discord.js';

// TODO(not7cd): use it later
import MQTT from "async-mqtt";
const client = MQTT.connect("tcp://mqtt.hack:1883")
client.subscribe('homie')
client.on('message', function (topic: string, message: string) {
  console.log(topic, message)
  if (topic.endsWith('$localIP')) {
    console.log("could contain node IP")
  }
})

const NODES = ['vortex-cam-1', 'vortex-cam-2', 'vortex-cam-3']

// TODO(not7cd): better return type
const getStatus = async (): Promise<Record<string, unknown>> => {
    
    // TODO(not7cd): get through MQTT 
    const deviceIp = "192.168.88.10"

    const jpg = `http://${deviceIp}/capture`

    const file = new MessageAttachment(jpg, `${NODES[0]}.jpg`);
    // inside a command, event listener, etc.
    const vortexEmbed = new MessageEmbed()
        .setColor(0x0099FF)
        .setTitle('Wir zagłady')
        .setURL('https://wiki.hsp.sh/vortex')
        .setDescription('Naturalna siła oczyszczająca spejs z rupieci')
        .setThumbnail('https://wiki.hsp.sh/_media/vortexofdoom.png')
        .addFields(
            { name: 'Tacka', value: 'n/a dni', inline: true },
        )
        .setImage(`attachment://${NODES[0]}.jpg`)
        .setTimestamp()

    return { embeds: [vortexEmbed], files: [file] };
}


export default {
    getStatus,
}
