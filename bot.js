//External libraries
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const XHR = require("xmlhttprequest").XMLHttpRequest;

const fs = require('fs');

//Internal libraries
const config = require("./config.json");
const friendCodes = require("./friend_codes.json");
client.prefix = "!";

//Environment variables
process.env.TOORNAMENT_TOKEN_RESULT = "";
process.env.TOORNAMENT_TOKEN_PARTICIPANT = "";

//Functions
const login = function(nbTries = 0) {
    client.login(config.DISCORD_TOKEN)
        .catch((err) => {
            if (nbTries == 5) {
                console.error("Error: cannot connect to client.");
            }
            else {
                console.error("Retrying to connect...");
                login(nbTries+1);
            }
        });
}

const getToornamentAuthorizations = function () {
    for (let scope in ["result", "participant"]) {
        const req = new XHR();
        var url = "https://api.toornament.com/oauth/v2/token";
        req.open("POST", url);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.addEventListener("load", function () {
            if (req.status < 200 && req.status >= 400)
                console.error(req.status + " " + req.statusText + " " + url);
        });
        req.addEventListener("error", function () {
            console.error("Error with URL " + url);
        });
        req.addEventListener("readystatechange", function () {
            if (req.readyState === 4) {
                let res = JSON.parse(req.responseText)
                let token = res.access_token
                switch (scope) {
                    case "result":
                        process.env.TOORNAMENT_TOKEN_RESULT = token;
                        break;
                    case "participant":
                        process.env.TOORNAMENT_TOKEN_PARTICIPANT = token;
                        break;
                }
            }
        });

        req.send(
            "grant_type=client_credentials&client_id=" +
            config.TOORNAMENT_ID +
            "&client_secret=" +
            config.TOORNAMENT_SECRET +
            "&scope=organizer:" +
            scope
        );
    }
}


// Load

client.commands = new Collection();
client.aliases = new Collection();
console.log("[CMDS] Reading commands dir...");
fs.readdir(__dirname+"/commands", (err, f) => {
    if (err) throw "[CMDS] Unable to read commands.";
    const s = Date.now();
    for (const file of f) {
        console.log("[CMDS] Reading "+file);
        if (file.endsWith(".js")) {
            const d = require(`${__dirname}/commands/${file}`);
            client.commands.set(d.name, d);
            d.aliases.forEach(alias => {
                client.aliases.set(alias, d.name);
            })
            console.log("[CMDS] Loaded", d.name);
        }
    }
    const t = Date.now()-s;
    console.log("[CMDS] Successfully loaded "+f.length+" files in "+t+"ms");
});
console.log("[EVNT] Reading events dir...");
fs.readdir(__dirname+"/events", (err, f) => {
    if (err) throw "[EVNT] Unable to read events.";
    const s = Date.now();
    for (const file of f) {
        console.log("[EVNT] Reading "+file);
        if (file.endsWith(".js")) {
            const d = require(`${__dirname}/events/${file}`);
            const evn = file.replace(/\.js/g, "");
            const binded = d.bind(null,client);
            client.on(evn, binded);
            console.log("[EVNT] Loaded", file);
        }
    }
    const t = Date.now()-s;
    console.log("[EVNT] Successfully loaded",f.length,"files in",t+"ms");
});

//Event listeners

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
}); //Detect when the bot is logged in.

client.on('error', console.error); //Avoid killing the bot if an error occur.

//Instructions
login(); //Log the bot into Discord.

setInterval(getToornamentAuthorizations, 86400000); //Refresh Toornament tokens when they expire