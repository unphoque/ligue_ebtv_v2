const { MessageEmbed } = require('discord.js');

module.exports = {
    run: (client, message, args) => {
        if (!args[0]) {
            let categories = {};
            let categoriesnames = [];
            client.commands.each(cmd => {
                if (cmd.category != "Debug") {
                    if (!categories[cmd.category]) {
                        categories[cmd.category] = [[cmd.name, cmd.description]];
                        categoriesnames.push(cmd.category);
                    } else {
                        categories[cmd.category].push([cmd.name, cmd.description]);
                    }
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
        } else {
            let command = args[0];
            const cmd = client.commands.get(command);
            if (!cmd) return message.reply(`Je n'ai pas trouvé la commande "${command}".`);
            if (!cmd.details) return message.reply("La commande n'a pas de détails d'utilisation");

            const e = new MessageEmbed();
            e.setTitle(`!${cmd.name}`);
            e.addField("Description",cmd.description)
                .addField("Utilisation",cmd.details);

            message.reply({embeds: [e]});
        }
    },
    name: "help",
    aliases: [],
    category: "Utilitaires",
    description: "Envoie le menu d'aide.",
    details: "!help <commande>"
}