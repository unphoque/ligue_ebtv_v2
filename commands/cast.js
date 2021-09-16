const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

//cast pre-saison
module.exports = {
    run: (client, message, args) => {

        if (!args[1]) {

            message.reply('Utilisation erronnee, deux equipes doivent etre mentionnees. !help castps pour plus d\'informations.');

        } else if (!CheckCasterAutorisations(message)) {

            message.reply('Vous n\'avez pas les autorisations necessaires. Seuls les casters et membres du staff peuvent utiliser cette commande.')

        } else if (!CheckArgumentsSiEquipes(args, message)) {

            message.reply('Deux équipes doivent etre mentionnees avec \"@\". !help castps pour plus d\'informations.');

        } else if (!CheckIfChannelDoesNotExist(args, message)) {

            const team1ID = SliceRoleIDFromMention(args[0]);
            const team2ID = SliceRoleIDFromMention(args[1]);

            const team1 = message.guild.roles.cache.get(team1ID);
            const team2 = message.guild.roles.cache.get(team2ID);

            let channelName = 'cast-' + team1.name + '-' + team2.name;
            channelName = channelName.replace(/\s+/g, '-').toLowerCase();

            let channel = message.guild.channels.cache.find(channel => channel.name === channelName);

            message.reply('Le salon <#' + channel.id + '> existe deja');

        }
        else {


            const team1ID = SliceRoleIDFromMention(args[0]);
            const team2ID = SliceRoleIDFromMention(args[1]);

            const team1 = message.guild.roles.cache.get(team1ID);
            const team2 = message.guild.roles.cache.get(team2ID);

            let channelName = 'cast-' + team1.name + '-' + team2.name;
            channelName = channelName.replace(/\s+/g, '-').toLowerCase();

            if (channelName.length > 32) {
                channelName = channelName.substring(0, 32);
            }

            let castCategory = null;
            if (config.DEV_MODE == 'True') {
                castCategory = '888075288460808242';
            } else {
                castCategory = '754972428807045121';
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
                        id: team1ID,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    },
                    {
                        id: team2ID,
                        allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                    }
               ],
               parent: castCategory //category 'CAST PRE-SAISON' ID

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

function CheckArgumentsSiEquipes(arguments, message) {

    let resultTest = false;

    let role1 = message.guild.roles.cache.find(x => x.id === SliceRoleIDFromMention(arguments[0]));
    let role2 = message.guild.roles.cache.find(x => x.id === SliceRoleIDFromMention(arguments[1]));

    if (role1 && role2) {
        resultTest = true;
    }

    return resultTest;
}

function CheckIfChannelDoesNotExist(args, message) {

    let resultTest = false;

    const team1ID = SliceRoleIDFromMention(args[0]);
    const team2ID = SliceRoleIDFromMention(args[1]);

    const team1 = message.guild.roles.cache.get(team1ID);
    const team2 = message.guild.roles.cache.get(team2ID);

    let channelName = 'cast-' + team1.name + '-' + team2.name;
    channelName = channelName.replace(/\s+/g, '-').toLowerCase();

    let channelExistant = message.guild.channels.cache.find(channel => channel.name === channelName);

    if (!channelExistant) {
        resultTest = true
    }

    return resultTest;
}