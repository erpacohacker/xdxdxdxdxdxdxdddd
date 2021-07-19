const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "expulsar",
    category: "staff",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue, solo) => {
        const developers = new db.crearDB('developers', 'data_ids');
        let dev = await developers.obtener('Agency');
        if(!dev.includes(message.author.id))return message.reply('Ese comando es solo para el equipo de la Agencia.');
        const userMention = message.mentions.users.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        if(userMention.id == '559502596847435827')return message.reply('No.');
        let userID = client.users.cache.get(userMention.id);
        let txt = message.content.slice(prefix.length + 27).trim();
        let razon = '';
        if(!txt){ razon = 'Ninguna razón.' }else{ razon = txt }
        if (userMention) {
        const member = message.guild.member(userMention);
        if (member) {
            userID.send('Has sido expulsado de `'+message.guild.name+'` por un staff de la Agencia.\n\n**AgencyStaff:** `'+message.author.tag+'`\n**Razón:** `'+razon+'`').then(msg => {
                message.channel.send(`<a:sp_loading:805810562349006918> | \`Estoy recorriendo mis datos antes de expulsar a ${userMention.tag}.\``).then(b => {
                const kickEmbed = new Discord.MessageEmbed()
                .setDescription(`**__Miembro expulsado:__** <@${userMention.id}> (${userMention.id})\n**__AgencyStaff:__** <@${message.author.id}> (${message.author.id})\n**__Razón:__** \`${razon}\``)
                .setColor(0x5c4fff);
                b.delete();
                message.channel.send(kickEmbed);
                });
                member.kick(razon).catch(err => { message.reply("No he podido expulsar al miembro mencionado.");
                    console.error(err);
            });
        });
        }else{
			message.reply("Ese usuario no está en este servidor.");
        }
        }else{
            message.reply("Debes mencionar a un usuario para expulsar.");
        }
    }
}