const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "ban",
    category: "moderacion",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, infoEmbed, embedColorBlue) => {
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('Necesito permiso de __Banear Miembros__.')
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Necesitas permiso de __Banear Miembros__.");
        let userMention = message.mentions.members.first();
        const as = message.mentions.members.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        if(userMention.id == message.author.id)return message.reply('¿Qué? ¿Por qué?');
        if(message.member.roles.highest.comparePositionTo(as.roles.highest) <= 0)return message.reply('La persona tiene un rol más alto que tú o tiene el mismo rol.');
        if(userMention.id == '559502596847435827')return message.reply('No.');
        let razon = '';
        if(!args.join(' ')){ razon = 'Ninguna razón.' }else{ razon = args.slice(1).join(' '); }
        if(!message.guild.member(userMention).bannable) return message.reply('No puedo banear al usuario mencionado.');  
        let userID = client.users.cache.get(userMention.id);
        userID.send('Has sido baneado de `'+message.guild.name+'`.\n\n**Moderador:** `'+message.author.tag+'`\n**__Razón:__** `'+razon+'`');
        message.guild.member(userMention).ban({reason: razon});
        const banEmbed = new Discord.MessageEmbed()
        .setDescription(`**__Miembro baneado:__** <@${userMention.id}> (${userMention.id})\n\n**__Moderador:__** <@${message.author.id}> (${message.author.id})\n\n**__Razón:__** \`${razon}\``)
        .setTimestamp().setColor(0x5c4fff)
        message.channel.send(banEmbed);
    }
}