const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Help command',
    args: false,
    aliases: ['commands'],
    execute(message, args) {
        const commands = [];
        message.client.commands.forEach(command => {
            if (!command.noindex) {
                commands.push(command.name)
            }
        });

        if (!args.length) {
            const embed = {
                color: '#F5765B',
                title: 'Zeus command list',
                author: {
                    name: `${message.client.user.username}`,
                    icon_url: `${message.client.user.displayAvatarURL({format: 'jpg'})}`,
                },
                description: `Type ${prefix}help [command] to get more information about the command`,
                fields: [
                    {
                        name: 'Commands:',
                        value: "```" + `${commands.join(', ')}` + "```",
                    },
                ],
                timestamp: new Date(),
                footer: {
                    text: `${message.author.tag}`,
                    icon_url: `${message.author.displayAvatarURL({format: 'jpg'})}`
                },
            };

            message.channel.send({embeds: [embed]})
                .then()
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });

        }
    },
};