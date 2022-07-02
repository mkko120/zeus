const {MessageEmbed} = require("discord.js");
const db = require("../db");
const utils = require("../utils");

module.exports = {
    name: 'warnlist',
    description: 'Show list of warns for specified user',
    args: false,
    aliases: ['wl'],
    async execute(message, args) {

        if (!await utils.isModerator(message)) {
            return message.reply("You do not have permission to use this command.");
        }

        const user = message.mentions.users.first();

        if (!user) {
            return message.reply("Please mention a valid user.");
        }

        const serverWarnings = await db.get("warnings");

        const userWarnings = serverWarnings[user.id];

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTitle("Warnings")
            .setDescription(`${user.tag} has ${userWarnings !== undefined ? userWarnings.length : 0} warnings.`);

        if (userWarnings !== undefined && userWarnings.length > 0) {
            userWarnings.forEach((warning, index) => {
                embed.addField(`Warning ${index + 1}`, `Issued by: ${warning.issuer}\nReason: ${warning.reason}\nDate: ${warning.date}`);
            });
        }


        message.channel.send({embeds: [embed]});
    },
};