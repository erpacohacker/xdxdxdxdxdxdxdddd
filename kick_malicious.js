const Discord = require('discord.js');
const db = require('megadb');
const infoEmbed = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor('5c4fff');

module.exports = {
    nombre: "kick.malicious",
    category: "proteccion",
    alias: ['km', 'kick-malicious'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix) => {
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Necesitas permiso de __Administrador__.');
        const antiMaliciosos = new db.crearDB('antimaliciosos', 'data_guilds');
        if(antiMaliciosos.tiene(message.guild.id)) {
            antiMaliciosos.eliminar(message.guild.id);
            infoEmbed.setDescription('`Ya no expulso usuarios maliciosos.`');
            message.channel.send(infoEmbed);
            return;
        }
        if(!antiMaliciosos.tiene(message.guild.id)) {
            antiMaliciosos.establecer(message.guild.id, 'Activado');
            infoEmbed.setDescription('`Ahora expulso usuarios maliciosos.`');
            message.channel.send(infoEmbed);
            return;
        }

    }
}