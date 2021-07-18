const Discord = require('discord.js');
const db = require('megadb');
const dev = new db.crearDB('devsActivos', 'data_ids');
const infoEmbed = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor('5c4fff');
const embed = new Discord.MessageEmbed().setColor('5c4fff');

module.exports = {
    nombre: "sos",
    category: "proteccion",
    alias: ['alarma'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix) => {
        if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send('Necesitas permiso de __Administrador__.');
        const d = await dev.obtener('devs');
        if(d.length <= 0) {
            infoEmbed.setDescription('🆘 | ¡No hay developers disponibles!')
        }
        let chooseDev = d[Math.floor(Math.random() * d.length)];
        let developer = client.users.cache.get(chooseDev);
        infoEmbed.setDescription('<a:sp_loading:805810562349006918> | `¡Entendido! He avisado a un staff activo (`<@'+chooseDev+'>`)`');
        let invite = await message.guild.channels.cache.filter(m => m.type == "text").random().createInvite();
        if(invite == undefined)return message.channel.send('Error, no he podido crear la invitación de este servidor.');
        developer.send(embed.setDescription(`🆘 | \`S.O.S EN ${message.guild.name} (${message.guild.id})\`\n\n[ÚNETE](${invite})`)).catch(err => infoEmbed.setDescription(err));
        message.channel.send(infoEmbed);
    }
}