const { MessageEmbed } = require('discord.js')
const db = require('./db');

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


const utils = {
    embedBuilder,
}

module.exports = utils;