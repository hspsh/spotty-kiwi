import { CommandInteraction } from 'discord.js'
import whois from './whois'

type Command = {
    name: string,
    description: string,
    handle: (interaction: CommandInteraction) => Promise<void>
}

const commands : [Command] = [{
    name: 'ktohakuje',
    description: 'Sprawdź kto jest teraz w spejsie',
    handle: async (interaction: CommandInteraction) : Promise<void> => {
        await interaction.reply(await whois())
    }
}]

export default commands
