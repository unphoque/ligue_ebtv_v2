const { MessageEmbed } = require('discord.js');
const Toornament = require('../utils/toornament');

module.exports = {
    run: (client, message, args) => {

        if (!message.channel.name.includes("cmd-bot")) {
            return
        }

        //!match
        //Action à exécuter si aucun argument n'est passé en paramètre
        if (!args[0]) {


        } else {


            let action = args[0];
            switch (action) {

                //!match planif
                case 'p':
                case 'planif':

                    if (args.length != 5) {
                        message.reply('Erreur : la syntaxe est !match planif <team1> <team2> <JJ/MM/AA> <HH:mm>');
                        return;
                    }

                    let teamNames = [];
                    message.mentions.roles.each(role => teamNames.push(role.name));
                    if (teamNames.length != 2) {
                        message.reply('Erreur : il faut mentionner deux roles d\'équipe.');
                        return;
                    }

                    let date = new Date();
                    let day = args[4].replaceAll("-",":").split("/");
                    let hour = args[5].replaceAll("h",":").split(":")


                    break;

                //!match result
                case 'r':
                case 'result':
                    break;

                //!match annul
                case 'a':
                case 'annul':
                    break;

                default:
                    break;

            }

            return;

            

            
        }
    },
    name: "match",
    aliases: [],
    category: "Matchs",
    description: "Permet de planifier les matchs et mettre les résultats",
    details: "!match <commande>"
}