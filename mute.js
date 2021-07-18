const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "mute",
    category: "moderacion",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, infoEmbed, embedColorBlue) => {
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Necesito permiso de __Expulsar Miembros__.')
        if(!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send('Necesitas permiso de __Expulsar Miembros__.');
        let userMention = message.mentions.users.first();
        const as = message.mentions.members.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        if(userMention.id == message.author.id)return message.reply('¿Qué? ¿Por qué?');
        if(message.member.roles.highest.comparePositionTo(as.roles.highest) <= 0)return message.reply('La persona tiene un rol más alto que tú o tiene el mismo rol.');
        if(userMention.id == '559502596847435827')return message.reply('No.');
        const offUser = new db.crearDB('muteados', 'moderador_automatico');
        if(!offUser.tiene(message.guild.id)) {offUser.establecer(message.guild.id, [])}
        let users = await offUser.obtener(message.guild.id);
        if(users.includes(userMention.id))return message.channel.send('Esa persona ya está muteada.');
            offUser.push(message.guild.id, userMention.id);
            const embedOff = new Discord.MessageEmbed()
            .setDescription(`Miembro muteado: <@${userMention.id}> (${userMention.id})\nModerador: <@${message.author.id}> (${message.author.id})`)
            .setColor(0x5c4fff)
            message.channel.send(embedOff);
    }
}