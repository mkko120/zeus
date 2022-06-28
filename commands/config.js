const utils = require('../utils');
const config = require('../config');
const fs = require('fs')

module.exports = {
    name: 'config',
    description: 'config',
    args: false,
    aliases: [''],
    execute(message, args) {
        if (args[0] === "embed") {
            message.reply({embeds: [utils.embedBuilder(message.author, message.content, message.channel, "DARK_GREEN", "Warning")]})
        }
        if(args[0] === "channel") {
            config.channels[message.guild.id] = message.channel.id
            try {
                fs.writeFileSync(__dirname + '/../config.json', JSON.stringify(config, null, 4));
            } catch (err) {
                console.error(err)
            }
            message.reply("Channel " + message.channel.toString() + " saved succesfully!");
        }
    },
};