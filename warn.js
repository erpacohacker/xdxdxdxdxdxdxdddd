const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "warn",
    category: "moderacion",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, infoEmbed, embedColorBlue) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES'))return message.reply('Necesitas permiso de __Gestionar Mensajes__.');
        const warn = new db.crearDB('warns', 'moderador_automatico');
        let userMention = message.mentions.users.first();
        const as = message.mentions.members.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        if(userMention.id == message.author.id)return message.reply('¿Qué? ¿Por qué?');
        if(message.member.roles.highest.comparePositionTo(as.roles.highest) <= 0)return message.reply('La persona tiene un rol más alto que tú o tiene el mismo rol.');
        if(userMention.id == '559502596847435827')return message.reply('No.');
        let txt = message.content.slice(prefix.length + 27).trim();
        let razon = '';
        if(!txt){ razon = 'Ninguna razón.' }else{ razon = txt }
        if(!warn.tiene(`${message.guild.id}.${userMention.id}`)) {warn.set(`${message.guild.id}.${userMention.id}`, {warns: [], moderadores: [], subcontador: 0})}
        warn.push(`${message.guild.id}.${userMention.id}.warns`, razon);
        warn.push(`${message.guild.id}.${userMention.id}.moderadores`, message.author.id);
        let {warns, moderadores, subcontador} = await warn.obtener(`${message.guild.id}.${userMention.id}`);
        const embed = new Discord.MessageEmbed()
        .setDescription(`<@${userMention.id}> | ${userMention.id} ha sido warneado.\n\nModerador: <@${message.author.id}>\nRazón: \`${razon}\`\nAhora tiene \`${warns.length}\` warns.`)
        .setColor(0x5c4fff);
        message.channel.send(embed);
    }
}