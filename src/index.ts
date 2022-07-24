console.clear();
// .env
import * as dotenv from "dotenv";
dotenv.config();

import { Client } from "discord.js";
const bot = new Client({
    intents: [
        32767 // tous les intents
    ]
});

bot.login(process.env.TOKEN);

bot.on('ready', () => {
    console.log('Bot is ready!');
});
