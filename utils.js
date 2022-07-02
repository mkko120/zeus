const { MessageEmbed, TextChannel} = require('discord.js')
const db = require('./db');
const config = require('./config');

const embedBuilder = (author, message, channel, color, title) => {
    return new MessageEmbed()
        .setColor(color)
        .setTitle('Automod notification')
        .setAuthor({name: author.tag, iconURL: author.displayAvatarURL({format: 'jpg'})})
        .setDescription("This is an auto-generated notification")
        .addField("Notification type", title)
        .addField("Message", message)
        .addField("Channel", channel.toString())
        .setTimestamp()
        .setFooter({text: `UserID: ${author.id}`});
}

const dbSetup = async () => {

    let warnings = await db.get("warnings");

    if (warnings !== null) return;

    await db.set("warnings", {});
}


const sendEmbedMessage = async (author, message, channel, color, title) => {
    const em = embedBuilder(author, message, channel, color, title)

    const dbConfig = await db.get("config");
    if (dbConfig[channel.guild.id].logChannelID !== undefined || dbConfig[channel.guild.id].logChannelID !== null) {
        fetchAndSend(channel.guild, dbConfig[channel.guild.id].logChannelID, em)
    } else {
        if (config.channels[channel.guild.id] !== undefined || config.channels[channel.guild.id] !== null) {
            fetchAndSend(channel.guild, config.channels[channel.guild.id], em)
            dbConfig[channel.guild.id].logChannelID = config.channels[channel.guild.id];
            await db.set("config", dbConfig);
        } else {
            console.log("[utils.js:40] No channel found for guild: " + channel.guild.name)
        }
    }
}

const fetchAndSend = (guild, channelID, em) => {
    guild.channels.fetch(channelID)
        .then(ch => {
            if (ch instanceof TextChannel) {
                ch.send({embeds: [em]})
            }
        })
        .catch(console.log)
}


const utils = {
    embedBuilder,
    dbSetup,
    sendEmbedMessage
}

module.exports = utils;