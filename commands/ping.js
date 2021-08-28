module.exports = {
    run: (client, message) => {
        const start = Date.now();
        message.reply("Début du ping...").then((m)=>{
            m.edit(`:ping_pong: Latence du bot: **${Date.now()-start}ms**\n:computer: Latence de l'api: **${client.ws.ping}ms**`)
        });
    },
    name: "ping",
    aliases: [],
    category: "Utilitaires",
    description: "Renvoie le ping du bot."
}