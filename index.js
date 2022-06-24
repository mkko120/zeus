const Discord = require('discord.js')
const {readdirSync} = require("fs");
require("dotenv").config()

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
    ], shards: "auto"
})

client.commands = new Discord.Collection()

client.on('ready', () => {
    console.log("Bot ready!")
})

readdirSync('./commands/').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
});

readdirSync('./events/').filter(file => file.endsWith('.js')).forEach(async file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        await client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        await client.on(event.name, (...args) => event.execute(...args, client));
    }
});

client.login(process.env.ZEUS_API_KEY).then(() => {
    console.log("Logged in as: " + client.user.tag);
})