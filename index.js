// Discord.js bot
const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const cheerio = require('cheerio');




client.on('ready', () => {
    client.user.setActivity('old replays', {type: 'WATCHING'});
});

client.on('message', msg => {
    if (!msg.content.startsWith(process.env.PREFIX) /*|| !msg.guild */) return;
    const command = msg.content.split(' ')[0].substr(process.env.PREFIX.length);
    const args = msg.content.split(' ').slice(1).join(' ');
    if (command === 'hallo' || command === 'hei') return msg.channel.send('Hei, ' + msg.author.toString() + "!");
    else if (command === 'kamp') {
        getNextMatch().then(function(match) {
            embedMatch(msg.channel, match);
        });
    }
    /* else if (command === 'invite') return msg.channel.send(process.env.INVITE); */
});

client.login(process.env.TOKEN);

function embedMatch(channel, match) {
    let players = (typeof(match._awayTeam) === "string" ? match._homeTeam._players : match._awayTeam._players);
    let playerList = "";
    try {
        players.forEach(function(player) {
            playerList += "• [" + player._userName + "](" + "https://rltracker.pro/profiles/" + player._steamId + "/steam)\n";
        });
    } catch (e) {
        console.log(e.toString());
    }


    const embed = {
        "title": (typeof(match._homeTeam) === "string" ? match._homeTeam : match._homeTeam._name) + " - " + (typeof(match._awayTeam) === "string" ? match._awayTeam : match._awayTeam._name),
        "description": match._matchTime,
        "url": match._matchUrl,
        "color": 3741657,
        "image": {
            "url": match._opponentImg
        },
        "fields": [
            {
                "name": "Spillere",
                "value": playerList
            }
        ]
    };
    channel.send({ embed });
}

function getNextMatch() {
    return new Promise((resolve, reject) => {
        getDoc(process.env.TEAMURL).then(function ($) {
            try {
                let matchTime = $('li.match span.match-start span').first().text().trim();
                let homeTeam = $('span.teams > span.team > span.team-name').first().text().trim();
                let awayTeam = $('span.teams > span.team + span.team span.team-name').first().text().trim();
                let matchURL = "https://gamer.no" + $('li.match > a').first().attr("href");

                getDoc(matchURL).then(function ($) {
                    let opponentURL = "https://gamer.no";
                    opponentURL += $('div.esport-box-group > div.' + (homeTeam === process.env.TEAMNAME ? 'away' : 'home') + '-team > a').first().attr("href");
                    getDoc(opponentURL).then(function ($) {
                        let opponentIMG = "http:" + $('figure.avatar > img').first().attr("src");
                        const players = [];


                        $('span.user-name > a:not(.steam-id)').each(function (i) {
                            players[i] = new Player($(this).text(), "0");
                        });

                        $('span.user-name > a.steam-id').each(function (i) {
                            let steamId = $(this).attr("href").substring($(this).attr("href").lastIndexOf('/') + 1);
                            players[i]._steamId = steamId;
                        });


                        // Create opponent team object
                        let opponentTeamName = homeTeam;
                        if (homeTeam === process.env.TEAMNAME) {
                            opponentTeamName = awayTeam;
                        }

                        console.log("Home: " + homeTeam + "\n" + "Away: " + awayTeam + "\n" + "Opponent: " + opponentTeamName + "Ascent: " + process.env.TEAMNAME);

                        let t = new Team(opponentTeamName, players, opponentURL);

                        // Create match object
                        resolve(new Match((opponentTeamName === homeTeam ? t : process.env.TEAMNAME), (opponentTeamName === awayTeam ? t : process.env.TEAMNAME), matchTime, matchURL, opponentIMG));

                    });

                });


            } catch (e) {
                console.log(e.toString());
                console.log("Fant ingen kamper!");
                reject();
            }
        });

    });
}



function getDoc(url) {
    return new Promise((resolve, reject) =>{
        request(url, function(error, response, html) {
            if (!error && response.statusCode === 200) {
                resolve(cheerio.load(html));
            } else {
                reject();
                return null;
            }
        });
    });
}


/*------------------------------------------------
 * PLAYER CLASS
 * TODO: CLASSES SHOULD RESIDE SEPARATE FILES...
 ------------------------------------------------*/

class Player {
    constructor(userName, steamId) {
        this._userName = userName;
        this._steamId = steamId;
    }


    get userName() {
        return this._userName;
    }

    set userName(value) {
        this._userName = value;
    }

    get steamId() {
        return this._steamId;
    }

    set steamId(value) {
        this._steamId = value;
    }

}

/*------------------------------------------------
 * TEAM CLASS
 * TODO: CLASSES SHOULD RESIDE SEPARATE FILES...
 ------------------------------------------------*/

class Team {
    constructor(name, players, teamURL) {
        this._name = name;
        this._players = players;
        this._teamURL = teamURL;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get players() {
        return this._players;
    }

    set players(value) {
        this._players = value;
    }

    get teamURL() {
        return this._teamURL;
    }

    set teamURL(value) {
        this._teamURL = value;
    }
}

/*------------------------------------------------
 * MATCH CLASS
 * TODO: CLASSES SHOULD RESIDE SEPARATE FILES...
 ------------------------------------------------*/

class Match {
    constructor(homeTeam, awayTeam, matchTime, matchUrl, awayTeamImg) {
        this._homeTeam = homeTeam;
        this._awayTeam = awayTeam;
        this._matchTime = matchTime;
        this._matchUrl = matchUrl;
        this._opponentImg = awayTeamImg;
    }


    get homeTeam() {
        return this._homeTeam;
    }

    set homeTeam(value) {
        this._homeTeam = value;
    }

    get awayTeam() {
        return this._awayTeam;
    }

    set awayTeam(value) {
        this._awayTeam = value;
    }

    get matchTime() {
        return this._matchTime;
    }

    set matchTime(value) {
        this._matchTime = value;
    }

    get matchUrl() {
        return this._matchUrl;
    }

    set matchUrl(value) {
        this._matchUrl = value;
    }

    get opponentImg() {
        return this._opponentImg;
    }

    set opponentImg(value) {
        this._opponentImg = value;
    }
}