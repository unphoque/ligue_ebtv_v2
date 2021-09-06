const { MessageEmbed } = require('discord.js');
const Toornament = require('../utils/toornament');

module.exports = {
    run: (client, message, args) => {

        //TODO -> erreurs possibles
        if (!args[0] || !args[1]) {


        } else {

            const server = message.guild;

            const team1ID = SliceRoleIDFromMention(args[0]);
            const team2ID = SliceRoleIDFromMention(args[1]);
            
            const team1 = server.roles.cache.get(team1ID); 
            const team2 = server.roles.cache.get(team2ID); 
            
            let channelName = 'cast-' + team1.name + '-' + team2.name;
            if (channelName.length > 32) {
                channelName = channelName.substring(0, 32);
            }

            server.channels.create(channelName, {
                type: "text",
                permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: server.roles.cache.find(role => role.name == 'Staff Ligue'),
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                        id: team1ID,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                        id: team2ID,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    }
                ],
                parent: '754972428807045121' //category 'CAST PRE-SAISON' ID

            });

            return;




        }
    },
    name: "cast",
    aliases: [],
    category: "Creation channel",
    description: "Permet de creer les canaux ecrits de cast dans Discord",
    details: "!cast <equipe1> <equipe2>"
}

function SliceRoleIDFromMention(RoleIDFromMessage) {
    let RoleID = RoleIDFromMessage.slice(3);
    RoleID = RoleID.slice(0, -1);
    return RoleID;
}