const { MessageEmbed } = require('discord.js');

module.exports = {
    run: (client, message) => {
        let categories = {};
        let categoriesnames = [];
        client.commands.each(cmd => {
            if (!categories[cmd.category]) {
                categories[cmd.category] = [[cmd.name, cmd.description]];
                categoriesnames.push(cmd.category);
            } else {
                categories[cmd.category].push([cmd.name, cmd.description]);
            }
        });

        const e = new MessageEmbed();

        e.setTitle("Menu d'aide").setDescription("_ _");

        for (const cn of categoriesnames) {
            e.addField(`${cn}:`, "_ _");
            for (const cmd of categories[cn]) {
                e.addField(`!${cmd[0]}`, cmd[1]);
            }
        }

        e.setFooter(`Demandé par ${message.author.tag}`, message.author.avatarURL());
        message.reply({embeds: [e]});
    },
    name: "help",
    aliases: [],
    category: "Utilitaires",
    description: "Envoie le menu d'aide."
}