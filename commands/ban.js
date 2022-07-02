const utils = require("../utils");
module.exports = {
    name: 'ban',
    description: 'Bans an user from the server',
    args: true,
    async execute(message, args) {

        if (!await utils.isModerator(message)) {
            return message.reply("You do not have permission to use this command.");
        }

        const user = message.mentions.users.first();

        if (!user) {
            return message.reply("Please mention a valid user.");
        }

        if (user.id === message.author.id) {
            return message.reply("You cannot ban yourself.");
        }

        if (user.id === message.guild.ownerId) {
            return message.reply("You cannot ban the server owner.");
        }

        if (user.id === message.client.user.id) {
            return message.reply("You cannot ban the bot.");
        }

        const guildMember = await message.guild.members.fetch(user.id)

        if (guildMember.permissions.has("BAN_MEMBERS")) {
            return message.reply("You cannot ban a user with the same or higher permissions than you.");
        }

        const reason = args.length > 1 ? args.slice(1).join(" ") : "No reason given.";

        await message.guild.members.ban(user, {reason: reason})
            .then((banInfo) => {
                message.reply(`Successfully banned ${user.tag}`);
                console.log(`Banned ${banInfo.user?.tag ?? banInfo.tag ?? banInfo}`)
                utils.sendEmbedMessage(message.author, reason, message.channel, "RED", "Ban", user);
            })
            .catch(console.log);
    },
};