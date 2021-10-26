const { MessageEmbed, Team } = require('discord.js');
const config = require('../config.json');

//commande cast
module.exports = {

    run: (client, message, args) => {

        if (!CheckAutorisations(message)) {
            message.reply('Vous n\'avez pas les autorisations nécessaires. Seuls les membres du staff peuvent utiliser cette commande.')
            return;
        }

        //retire les espaces s'il y en a trop dans le message
        args = args.filter((value) => value != '');

        if (args[0] === 'delete') {

            DeleteCastChannels(message);
            message.reply('Salons de cast supprimes');
            return;

        }


        
    },

    name: "cast",
    aliases: [],
    category: "Cast",
    description: "Permet de creer les canaux ecrits de cast dans Discord et de les supprimer",
    details: "!cast <equipe1> <equipe2> OU !cast delete"
}


function CheckAutorisations(message) {

    let resultTest = false;

    if (message.member.roles.cache.some(role => role.name === 'Staff Ligue')) {
        resultTest = true;
    }
    return resultTest;
}

function DeleteCastChannels(message) {

    message.guild.channels.cache.forEach(chan => {
        if (chan.name.startsWith('cast-')) {
            chan.delete();
        }
    })

}