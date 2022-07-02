const db = require("../db")

module.exports = {
    name: 'warn',
    description: 'warn',
    args: true,
    aliases: ['w'],
    async execute(message, args) {
        // message.reply("Command still in development...")

        /*
        * 1. database access
        * 2. Message
        *   - about failure
        *   - about success
        *
        */

        const serverWarnings = await db.get("warnings");

        const user = message.mentions.users.first();

        if (!user) {
            return message.reply("Please mention a valid user.");
        }

        const userWarnings = serverWarnings[user.id];

        if (userWarnings === undefined) {
            serverWarnings[user] = [];
        }

        const warningData = {
            issuer: message.author,
            reason: args.slice(1).join(" ") === "" || " " ? "No reason given." : args.slice(1).join(" "),
            date: new Date().toUTCString(),
        }

        serverWarnings[user.id].push(warningData);

        await db.set("warnings", serverWarnings)
            .then(() => {
                console.log("Succesfully pushed warning to database: ", warningData);
                message.reply(`Successfully warned ${user.tag} for: **${warningData.reason}**. It's their **${serverWarnings[user.id].length}** warning.`);
                utils.sendEmbedMessage(user.toString(), warningData.reason, message.channel, "#ff0000", "Warning");
            })
            .catch(console.log);

    },
};