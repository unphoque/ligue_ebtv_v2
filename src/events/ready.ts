import { Client, Collection } from "discord.js";

export default function ready(bot: Client) {
    console.log(bot.user.tag,"is now ready!");
}
