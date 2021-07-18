const Discord = require('discord.js');
const db = require('megadb');
const log = new db.crearDB('casos', 'logs');
const contador = new db.crearDB('contador', 'logs');
const logs = new db.crearDB('canales', 'logs');

module.exports = async (client, message) => {
    //Logs:
    if(logs.tiene(message.guild.id)) {
        if(message.author.id == client.user.id)return;
        let channelToSendMsgs = await logs.obtener(message.guild.id);
        const canal = client.channels.cache.get(channelToSendMsgs);
        let plus = await contador.obtener('reciente');
        contador.sumar('reciente', 1);
        let suma = plus++;
        log.set(`${suma}.${message.guild.id}`, `Mensaje eliminado:\nAutor: **${message.author.id}**\nMensaje: **${message.content}**\nCaso: \`${suma}\``);
        canal.send(new Discord.MessageEmbed().setDescription(`Mensaje eliminado:\nAutor: **${message.author.id}**\nMensaje: **${message.content}**\nCaso: \`${suma}\``));
    }
}