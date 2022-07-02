const Discord = require('discord.js')
const { readdirSync } = require("fs");
const utils = require("./utils");
require("dotenv").config()

const express = require("express");
const app = express();

app.get('/', (req,res) => {
    res.send("Glory to Zeus, God of Olymp!");
})

app.listen(3000, () => {
    console.log("Zeus has awoken")
})

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_BANS,
    ], shards: "auto"
})

client.commands = new Discord.Collection()

client.on('ready', () => {
    utils.dbSetup()
        .then(() => {
            console.log("Database setup complete")
        })
        .catch(console.log);
    console.log("Bot ready!")
})

readdirSync('./commands/').filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
});

readdirSync('./events/').filter(file => file.endsWith('.js')).forEach(file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, async (...args) => await event.execute(...args, client));
    } else {
        client.on(event.name, async (...args) => await event.execute(...args, client));
    }
});

client.login(process.env.ZEUS_API_KEY).then(() => {
    console.log("Logged in as: " + client.user.tag);
})