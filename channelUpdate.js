const Discord = require('discord.js');
const db = require('megadb');
const message = require('./message');

module.exports = async (client, channel) => {
    if(channel.type === 'dm')return;
    const antichannels = new db.crearDB('antichannels', 'data_guilds');
    if(antichannels.tiene(channel.guild.id)) {
        const data = new db.crearDB('dataAnticanales', 'data_guilds');
        if(!data.tiene(channel.guild.id)) data.establecer(channel.guild.id, 0);
        const dato = await data.obtener(channel.guild.id);
        if(dato == 0) {
            let nombre = channel.name;
            let channelType = channel.type;
            channel.edit(`${nombre}`, {reason: `Antichannels activo.`, type: `${channelType}`});
            data.sumar(channel.guild.id, 1);
        }
        setTimeout(() => {
            data.eliminar(channel.guild.id);       
        }, 300);
    }
}