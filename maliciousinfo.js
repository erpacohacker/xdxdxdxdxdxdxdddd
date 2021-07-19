const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "malicious.info",
    category: "staff",
    alias: ['mi', 'malicious-info'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue, solo) => {
        const developers = new db.crearDB('developers', 'data_ids');
        let dev = await developers.obtener('Agency');
        if(!dev.includes(message.author.id))return message.reply('Ese comando es solo para el equipo de la Agencia.');
        if(!parseInt(args[0]))return message.reply('Ingresa una id.');
        const usersData = new db.crearDB('usersData', 'data_ids');
        if(usersData.tiene(args[0])) {
        let {razon, prueba} = await usersData.obtener(args[0]);
        const embed = new Discord.MessageEmbed()
        .setAuthor(`Información De Lista Negra.`)
        .setDescription(`ID: **${args[0]}**\nRazón: \`${razon}\``)
        .setImage(prueba).setColor(0x5c4fff);
        message.channel.send(embed);
        if(usersData.tiene(`${args[0]}.subprueba`)) {
            let {subprueba} = await usersData.obtener(args[0]);
            const em = new Discord.MessageEmbed().setImage(subprueba).setColor(0x5c4fff);
            message.channel.send(em);
        }
        }else{
            message.channel.send('<a:sp_si:805810572599099413> | `Esa persona no está marcada como un usuario malicioso.`')
        }
    }
}