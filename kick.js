const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "kick",
    category: "moderacion",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, infoEmbed, embedColorBlue) => {
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Necesito permiso de __Expulsar Miembros__.')
        if(!message.member.hasPermission('KICK_MEMBERS'))return message.channel.send(`Necesitas permisos de __Expulsar Miembros__.`);
        const userMention = message.mentions.users.first();
        const as = message.mentions.members.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        if(userMention.id == message.author.id)return message.reply('¿Qué? ¿Por qué?');
        if(message.member.roles.highest.comparePositionTo(as.roles.highest) <= 0)return message.reply('La persona tiene un rol más alto que tú o tiene el mismo rol.');
        if(userMention.id == '559502596847435827')return message.reply('No.');
        let userID = client.users.cache.get(userMention.id);
        let txt = message.content.slice(prefix.length + 27).trim();
        let razon = '';
        if(!txt){ razon = 'Ninguna razón.' }else{ razon = txt }
        if(!userMention)return message.reply("Debes mencionar a un usuario para expulsar.");
        const member = message.guild.member(userMention);
        if(!member)return message.reply("Ese usuario no está en este servidor.");
            userID.send('Has sido expulsado de `'+message.guild.name+'`.\n\n**Moderador:** `'+message.author.tag+'`\n**Razón:** `'+razon+'`').then(msg => {
                message.channel.send(`<a:sp_loading:805810562349006918> | \`Estoy recorriendo mis datos antes de expulsar a ${userMention.tag}.\``).then(b => {
                const kickEmbed = new Discord.MessageEmbed()
                .setDescription(`**__Miembro expulsado:__** <@${userMention.id}> (${userMention.id})\n**__Moderador:__** <@${message.author.id}> (${message.author.id})\n**__Razón:__** \`${razon}\``)
                .setColor(0x5c4fff);
                b.delete();
                message.channel.send(kickEmbed);
                });
                member.kick(razon).catch(err => { message.reply("No he podido expulsar al miembro mencionado.");
                    console.error(err);
            });
        });
    }
}