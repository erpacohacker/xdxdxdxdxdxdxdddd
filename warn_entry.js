const Discord = require('discord.js');
const db = require('megadb');
const infoEmbed = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor('5c4fff');

module.exports = {
    nombre: "warn.entry",
    category: "proteccion",
    alias: ['we', 'warn-entry'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix) => {
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.reply('Necesitas permiso de __Administrador__.');
        const warnEntry = new db.crearDB('warnMaliciousEntry', 'data_guilds');
        if(warnEntry.tiene(message.guild.id)) {
            warnEntry.eliminar(message.guild.id);
            infoEmbed.setDescription('`Ya no avisaré cuando un usuario malicioso se una a este servidor.`');
            message.channel.send(infoEmbed);
            return;
        }
        if(!warnEntry.tiene(message.guild.id)) {
            warnEntry.establecer(message.guild.id, 'Activado');
            infoEmbed.setDescription('`Ahora avisaré al propietario cuando un usuario malicioso se una a este servidor.`');
            message.channel.send(infoEmbed);
            return;
        }
    }
}