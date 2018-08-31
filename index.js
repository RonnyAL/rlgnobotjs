// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


client.on('ready', () => {
    client.user.setActivity('old replays test', {type: 'WATCHING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) /*|| !msg.guild */) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'test') return msg.channel.send('Node js yoyo');
    /* else if (command === 'invite') return msg.channel.send(process.env.INVITE); */
});

client.login(process.env.TOKEN);




