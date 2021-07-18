const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "warns",
    category: "moderacion",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, infoEmbed, embedColorBlue) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES'))return message.channel.send('Necesitas permiso de __Gestionar Mensajes__.');
        let userMention = message.mentions.users.first();
        if(!userMention)return message.channel.send('Menciona a una persona.');
        if(userMention.id == client.user.id)return;
        if(userMention.bot)return message.reply('No puedes mencionar a un bot.');
        const warn = new db.crearDB('warns', 'moderador_automatico');
        if(!warn.tiene(`${message.guild.id}.${userMention.id}`))return message.channel.send('La persona mencionada no tiene warns.');
        const {warns, moderadores, subcontador} = await warn.obtener(`${message.guild.id}.${userMention.id}`);
        let contador = 1;
        const embed = new Discord.MessageEmbed()
        .setDescription("Warns de <@"+userMention.id+">:\n\n" + warns.map(objt => `**__${contador++}__** > \`${objt}\``).join('\n'))
        .addField(`Por los moderadores:`, moderadores.map(mods => `<@${mods}>`).join(','))
        .setColor(0x5c4fff)
        if(warns.length >= 4) embed.setAuthor(`${userMention.tag} tiene demasiados avisos, con el moderador automático activado, la persona será expulsada/baneada.`);
        message.channel.send(embed);
    }
}