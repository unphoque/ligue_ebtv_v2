const { MessageEmbed, Team } = require('discord.js');
const config = require('../config.json');

//cast pre-saison
module.exports = {
    run: (client, message, args) => {

        if (message.mentions.roles.size != 2) {

            message.reply('Utilisation erronnee, deux equipes doivent etre mentionnees. !help castps pour plus d\'informations.');

        } else if (!CheckCasterAutorisations(message)) {

            message.reply('Vous n\'avez pas les autorisations necessaires. Seuls les casters et membres du staff peuvent utiliser cette commande.')

        } else if (!CheckIfChannelDoesNotExist(message)) {

            let channelName = 'cast-';
            let teamNames = [];
            message.mentions.roles.each(role => teamNames.push(role.name));
            channelName = channelName + teamNames[0] + '-';
            channelName = channelName + teamNames[1];
            channelName = channelName.replace(/\s+/g, '-').toLowerCase();

            if (channelName.length > 32) {
                channelName = channelName.substring(0, 32);
            }

            let channel = message.guild.channels.cache.find(channel => channel.name === channelName);

            message.reply('Le salon <#' + channel + '> existe deja');

        }
        else {

            let teamIDs = [];
            message.mentions.roles.each(role => teamIDs.push(role.id));

            let teamNames = [];
            message.mentions.roles.each(role => teamNames.push(role.name));

            let channelName = 'cast-';
            channelName = channelName + teamNames[0] + '-';
            channelName = channelName + teamNames[1];
            channelName = channelName.replace(/\s+/g, '-').toLowerCase();

            if (channelName.length > 32) {
                channelName = channelName.substring(0, 32);
            }

            let channelCategory = null;
            if (config.DEV_MODE == 'True') {
                channelCategory = '888075288460808242';
            } else {
                channelCategory = '754972428807045121';
            }

            message.guild.channels.create(channelName, {
               type: "text",
               permissionOverwrites: [
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: message.guild.roles.cache.find(role => role.name == 'Staff Ligue'),
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                   },
                   {
                       id: message.guild.roles.cache.find(role => role.name == 'Caster'),
                       allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                   },
                    {
                        id: teamIDs[0],
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                        id: teamIDs[1],
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    }
               ],
                parent: channelCategory //category 'CAST PRE-SAISON' ID

            }).then(channel => message.reply('Nouveau salon cree : <#' + channel.id + '>'));

            return
        }
    },
    name: "castps",
    aliases: [],
    category: "Cast",
    description: "Permet de créer les canaux écrits de cast dans Discord, pour la pré-saison",
    details: "!castps <equipe1> <equipe2>"
}

function SliceRoleIDFromMention(RoleIDFromMessage) {
    let RoleID = RoleIDFromMessage.slice(3);
    RoleID = RoleID.slice(0, -1);
    return RoleID;
}

function CheckCasterAutorisations(message) {

    let resultTest = false;

    if (message.member.roles.cache.some(role => role.name === 'Caster') || message.member.roles.cache.some(role => role.name === 'Staff Ligue')) {
        resultTest = true;
    }
    return resultTest;
}

function CheckIfChannelDoesNotExist(message) {

    let resultTest = false;

    let channelName = 'cast-';
    let teamNames = [];
    message.mentions.roles.each(role => teamNames.push(role.name));
    channelName = channelName + teamNames[0] + '-';
    channelName = channelName + teamNames[1];
    channelName = channelName.replace(/\s+/g, '-').toLowerCase();
    if (channelName.length > 32) {
        channelName = channelName.substring(0, 32);
    }

    let channelExistant = message.guild.channels.cache.find(channel => channel.name === channelName);

    if (!channelExistant) {
        resultTest = true
    }

    return resultTest;
}