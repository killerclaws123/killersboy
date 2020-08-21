const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = 't!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.on('ready', () => {
    console.log('Your bot is up and running!')
    client.user.setActivity('over server!', { type: 'WATCHING'}).catch(console.error);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if (command === 'youtube'){
        client.commands.get('youtube').execute(message, args);
    }
client.on("guildMemberAdd", member =>{

    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`Welcome to our server, ${member}, please read the rules in the rules channel!`);
})
});

client.login('NzI3NDk4NjUwMzU1MzY3OTY2.Xvst6g.E58twkrsQgfoFFUYVefU5Gz6lK4');
