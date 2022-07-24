console.clear();
// .env
import * as dotenv from "dotenv";
dotenv.config();

// lezgongue

import {command} from "./types/types";
import { Client, Collection } from "discord.js";
import * as fs from "fs";
const bot = new Client({
    intents: [
        32767 // tous les intents
    ]
});

const commands : Collection<string, command> = new Collection();

fs.readdirSync(__dirname+"/events").forEach(file => {
    const event = require(`./events/${file}`);
    const eventName = file.split(".")[0];
    console.log("| Registering event: " + eventName);
    bot.on(eventName, event.default.bind(null, bot));
});

fs.readdirSync(__dirname+"/commands").forEach(file => {
    const category = file;
    fs.readdirSync(__dirname+`/commands/${category}`).forEach(file => {
        const command = require(`./commands/${category}/${file}`).default;
        const commandName = file.split(".")[0];
        console.log("| Registering command: " + commandName);
        commands.set(commandName, command);
    });
});

bot.login(process.env.TOKEN);
