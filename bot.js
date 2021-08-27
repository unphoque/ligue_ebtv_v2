const config = require("./config.json")
const friendCodes = require("./friend_codes.json")

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const XHR = require("xmlhttprequest").XMLHttpRequest;

const login=function(nbTries=0) {
    client.login(config.DISCORD_TOKEN)
        .catch((err) => {
            if (nbTries == 5) {
                console.error("Error: cannot connect to client.")
            }
            else {
                console.error("Retrying to connect...");
                login(nbTries+1);
            }
        });
}


client.on('ready', () => console.log(`Logged in as ${client.user.tag}!`)); //Detect when the bot is logged in.

client.on('error', console.error); //Avoid killing the bot if an error occur.

login(); //Log the bot into Discord. Must be called as last instruction.