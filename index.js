// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


client.on('ready', () => {
    client.user.setActivity('old replays', {type: 'WATCHING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) /*|| !msg.guild */) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'hallo' || command === 'hei') return msg.channel.send('Hei, ' + msg.author.toString() + "!");
    else if (command === 'kamp') getNextMatch();
    /* else if (command === 'invite') return msg.channel.send(process.env.INVITE); */
});

client.login(process.env.TOKEN);

function getNextMatch() {
    let doc = getDoc(process.env.TEAMURL);
    let matches = doc.querySelector("li.match");
    console.log(matches.toString());
}

function getDoc(url) {
    const dom = JSDOM(``, {
        url: url,
        contentType: "text/html"
    });
    const doc = dom.window.document;
    return doc;
}

