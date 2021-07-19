const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "banear",
    category: "staff",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue, solo) => {
        const developers = new db.crearDB('developers', 'data_ids');
        let dev = await developers.obtener('Agency');
        if(!dev.includes(message.author.id))return message.reply('Ese comando es solo para el equipo de la Agencia.');
        let userMention = message.mentions.users.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        if(userMention.id == '559502596847435827')return message.reply('No.');
        let razon = '';
        if(!args.join(' ')){ razon = 'Ninguna razón.' }else{ razon = args.slice(1).join(' '); }
        if(!message.guild.member(userMention).bannable) return message.reply('No puedo banear al usuario mencionado.');  
        let userID = client.users.cache.get(userMention.id);
        userID.send('Has sido baneado de `'+message.guild.name+'` por un staff de la Agencia.\n\n**AgencyStaff:** `'+message.author.tag+'`\n**__Razón:__** `'+razon+'`');
        message.guild.member(userMention).ban({reason: razon});
        const banEmbed = new Discord.MessageEmbed()
        .setDescription(`**__Miembro baneado:__** <@${userMention.id}> (${userMention.id})\n\n**__AgencyStaff:__** <@${message.author.id}> (${message.author.id})\n\n**__Razón:__** \`${razon}\``)
        .setTimestamp().setColor('5c4fff')
        message.channel.send(banEmbed);
    }
}