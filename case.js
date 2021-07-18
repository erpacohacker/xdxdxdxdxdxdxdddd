const Discord = require('discord.js');
const db = require('megadb');
const log = new db.crearDB('casos', 'logs');
const contador = new db.crearDB('contador', 'logs');
const logs = new db.crearDB('canales', 'logs');

module.exports = {
    nombre: "case",
    category: "moderacion",
    alias: ['caso', 'log'],
    description: "",
    usage: [],
    run: async (client, message, args, prefix) => {
        if(!logs.tiene(message.guild.id))return message.channel.send('Este servidor no tiene los logs activados.');
        if(!message.member.hasPermission('MANAGE_MESSAGES'))return message.channel.send('Necesitas permisos de __Gestionar Mensajes__.');
        let caso = await log.obtener(`${args[0]}.${message.guild.id}`);
        try{
            if(caso == undefined)return message.channel.send('Ese caso no existe en este servidor.');
            if(parseInt(caso))return message.channel.send('Eso no era un número.');
            message.channel.send(new Discord.MessageEmbed().setDescription(caso)).catch(e => {
                message.channel.send('Ese caso no es de este servidor.');
            });
        }catch(err) {
            message.channel.send('Ese caso no es de este servidor.');
        }
    }
}