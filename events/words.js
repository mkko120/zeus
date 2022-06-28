const config = require('../config.json')
const { forbidden } = require('../forbidden.json')
const {TextChannel} = require("discord.js");
const utils = require("../utils");

module.exports = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {

        if (message.author.bot) return;
        if (message.content.startsWith(config.prefix)) return;

        forbidden.warn.every(word => {
            //console.log("checking word " + word)
            if (message.content.toLowerCase().includes(word)) {
                message.delete()
                    .then(msg => {
                        console.log(`[AutoMod] Deleted message from channel: #${msg.channel.name}\n` +
                            `[AutoMod] Channel id: ${message.channel.id}\n` +
                            `[AutoMod] Written by user: ${message.author.tag}\n` +
                            `[AutoMod] Message contents: \n${msg}`
                        )
                    })
                    .catch(err => {
                        if (err.httpStatus === 404) {
                            return console.log("Already deleted")
                        } else {
                            console.log(err)
                        }
                    })

                message.channel
                    .send(`${message.author.toString()} woah! That word is not allowed here!`)
                    .then(message => {
                        // todo warn user
                        setTimeout(() => {
                            message.delete().then(message => {
                                console.log("Deleted bot message: " + message)
                            })
                        }, 15000)
                    })
                    .catch(console.log)

                if (config.channels[message.guild.id] !== null) {
                    message.guild.channels.fetch(config.channels[message.guild.id]).then(ch => {
                        const em = utils.embedBuilder(message.author, message.content, message.channel, "DARK_AQUA", "Warning")
                        if (ch instanceof TextChannel) {
                            ch.send({embeds: [em]})
                        }
                    })
                }

                return false;
            }
            return true;
        })
        forbidden.ban.every(word => {
            if (message.content.toLowerCase().includes(word)) {
                message.delete()
                    .then(async msg => {
                        console.log(`[AutoMod] Deleted message from channel: #${
                                await message.guild.channels
                                    .fetch(msg.channel.id)
                                    .then(channel => {
                                        return channel.name
                                    })
                            }\n` +
                            `[AutoMod] Channel id: ${message.channel.id}\n` +
                            `[AutoMod] Written by user: ${message.author.tag}\n` +
                            `[AutoMod] Message contents: \n${msg}`
                        )
                    })
                    .catch(console.log)

                message.channel
                    .send(`Woah, ${message.author.toString()} really wanted a timeout, so they got one!`)
                    .then(() => {
                        message.guild.members.fetch(message.author)
                            .then(member => {
                                member.timeout(5 * 60 * 1000, "AutoMod timeout")
                                    .then(() => {})
                                    .catch(e => {
                                        if (e.httpStatus === 403) {
                                            message.guild.channels.fetch(config.channels[message.guild.id]).then(ch => {
                                                if (ch instanceof TextChannel) {
                                                    ch.send({embeds: [utils.embedBuilder(client.user, `\`\`\`${e}\`\`\``, message.channel, "DARK_RED", "Permission denied")]})
                                                        .then()
                                                        .catch(console.log);
                                                }
                                            }).catch(console.log)
                                        } else {
                                            console.log(e)
                                        }
                                    })
                            })
                            .catch(console.log)

                        if (config.channels[message.guild.id] !== null) {
                            message.guild.channels.fetch(config.channels[message.guild.id]).then(ch => {
                                const em = utils.embedBuilder(message.author, message.content, message.channel, "RED", "Timeout");
                                if (ch instanceof TextChannel) {
                                    ch.send({embeds: [em]})
                                }
                            }).catch(console.log);
                        }
                    }).catch(console.log)
            }
        })

    }
}