const { prefix } = require("../config.json");

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;


        console.log("prefix ",prefix)

        if (!message.content.startsWith(prefix)) return;
        console.log('Starts with prefix ' + prefix)

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        let commandname = args.shift().toLowerCase();

        const command = client.commands.get(commandname) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandname))

        console.log('Command found in name or aliases');

        if (!command) return message.channel.send(`Could not find command '${commandname}'. Try ${prefix}help for list of commands.`);

        if (command.args && !args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        try {
            await command.execute(message, args);
            console.log(`Command ${command.name} executed successfully by ${message.author.tag}`)
        } catch (e) {
            console.error(e);
            message.reply('There was an error trying to execute that command')
        }
    }
}