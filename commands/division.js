const { MessageEmbed } = require('discord.js');
const Toornament = require('../utils/toornament');

module.exports = {
    run: (client, message, args) => {

            //TODO -> !div
            //!div
            //Action à exécuter si aucun argument n'est passé en paramètre
            if (!args[0]) {


            } else {


                let action = args[0];
                switch (action) {

                    //!div create
                    //Creer les catégories de division par ordre croissant, en fonction des divisions sur Toornament
                    //Creer les salons suivants(N est le numero de la div) :
                    //- division - N
                    //- divN - planifications
                    //- divN - recap - manches
                    //- divN - support
                    //- divN - discussion
                    //Attention: N peut etre une lettre(Div K)
                    case 'create':
                        break;

                    //!div set
                    //Recupere les equipes placees dans Toornament, et les assigne a leur categorie de division respective.
                    case 'set':
                        break;

                    //!div delete
                    //Supprime les roles de division (Discord)
                    //A VERIFIER AVEC PHOQUE
                    case 'delete':
                        break;

                    default:
                        break;

                }

                return;

            

            
        }
    },
    name: "division",
    aliases: [],
    category: "Traitement",
    description: "Permet de creer ou supprimer les Divisions sur le serveur Discord (role et canaux ecrits), et d'assigner les equipes a leur division",
    details: "!div <commande>"
}