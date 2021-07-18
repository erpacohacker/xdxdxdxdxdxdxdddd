const Discord = require('discord.js');
const db = require('megadb');
const infoEmbed = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor('5c4fff');

module.exports = {
    nombre: "automoderator",
    category: "proteccion",
    alias: ['automoderador', 'moderador', 'am'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix) => {
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Necesitas permiso de __Administrador__.');
        const automoderator = new db.crearDB('automoderator', 'moderador_automatico');
        if(automoderator.tiene(message.guild.id)) {
            automoderator.eliminar(message.guild.id);
            infoEmbed.setDescription('`Ya no moderaré tu servidor.`');
            message.channel.send(infoEmbed);
            return;
        }
        if(!automoderator.tiene(message.guild.id)) {
            infoEmbed.setDescription('Vas a activar el automoderador, ¿Prefieres que haga kick o ban cuando un usuario tiene muchas infracciónes?\n\nReacciona a `1️⃣` si prefieres que expulse o reacciona a `2️⃣` si prefieres que haga ban.');
            message.channel.send(infoEmbed).then(x => {

                x.react('1️⃣'); x.react('2️⃣'); x.react('❌')
                x.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '1️⃣' || reaction.emoji.name == '2️⃣' || reaction.emoji.name == '❌'), { max: 1, time: 30000 }).then(collected => {
                    if(collected.first().emoji.name == '1️⃣') {
                        x.reactions.removeAll();
                        automoderator.establecer(message.guild.id, 'kick');
                        x.edit(infoEmbed.setDescription('`A partir de ahora moderaré tu servidor de forma automática y haré kick.`'));

                    }else if(collected.first().emoji.name == '2️⃣') {
                        x.reactions.removeAll();
                        automoderator.establecer(message.guild.id, 'ban');
                        x.edit(infoEmbed.setDescription('`A partir de ahora moderaré tu servidor de forma automática y haré ban.`'));  

                    }else if(collected.first().emoji.name == '❌') {
                        x.edit(infoEmbed.setDescription(`❌ | \`Entendido, he cancelado el comando.\``));
                        x.reactions.removeAll();

                    }else x.reactions.removeAll();
                }).catch(() => {
                    x.edit(infoEmbed.setDescription(`❌ | \`He cancelado el comando.\``));
                    x.reactions.removeAll();
                });
                return;
            });
        }
    }
}