const Discord = require('discord.js');
const db = require('megadb');
const infoEmbed = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor('5c4fff');

module.exports = {
    nombre: "status",
    category: "proteccion",
    alias: ['st'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        message.channel.send('<a:sp_loading:805810562349006918> | `Recopilando datos del servidor.`').then(msg => {
            setTimeout(() => {
                const moderator = new db.crearDB('automoderator', 'moderador_automatico');
                let p = '';
                if(moderator.tiene(message.guild.id)){p = '`Moderando Servidor.`'}else{p = '`Sin Moderar El Servidor.`'}
                const embed = new Discord.MessageEmbed()
                .setDescription(`Status Del Servidor \`${message.guild.name}\`\nPrefix: \`${prefix}\` | ${p}\n> **Miembros actuales:** ${message.guild.memberCount}\n> **Cantidad de Roles:** ${message.guild.roles.cache.size}\n> **Creado el:** ${message.guild.joinedAt.toDateString()}\n> **Region:** ${message.guild.region}`)
                .setFooter(`${message.guild.name}, ${message.guild.id}`, message.guild.iconURL())
                const antibots = new db.crearDB('antibots', 'data_guilds');
                if(antibots.tiene(message.guild.id)){embed.addField('🤖 | Antibots', '`Armado.`', true)}else{embed.addField('🤖 | Antibots', '`Desarmado.`', true)}
                const antichannels = new db.crearDB('antichannels', 'data_guilds');
                if(antichannels.tiene(message.guild.id)){embed.addField('🛠️ | Anti Canales', '`Armado.`', true)}else{embed.addField('🛠️ | Anti Canales', '`Desarmado.`', true)}
                const antijoins = new db.crearDB('antijoins', 'data_guilds');
                if(antijoins.tiene(message.guild.id)){embed.addField('👮 | Expulsar Miembros', '`Armado.`', true)}else{embed.addField('👮 | Expulsar Miembros', '`Desarmado.`', true)}
                const logs = new db.crearDB('canales', 'logs');
                if(logs.tiene(message.guild.id)){embed.addField('⚙️ | Registro', '`Armado.`', true)}else{embed.addField('⚙️ | Registro', '`Desarmado.`', true)}
                const antimaliciosos = new db.crearDB('antimaliciosos', 'data_guilds');
                if(antimaliciosos.tiene(message.guild.id)){embed.addField('⚔️ | Expulsar Maliciosos', '`Armado.`', true)}else{embed.addField('⚔️ | Expulsar Maliciosos', '`Desarmado.`', true)}
                const warnMaliciousEntry = new db.crearDB('warnMaliciousEntry', 'data_guilds');
                if(warnMaliciousEntry.tiene(message.guild.id)){embed.addField('📁 | Avisar Nuevos Maliciosos', '`Armado.`', true)}else{embed.addField('📁 | Avisar Nuevos Maliciosos', '`Desarmado.`', true)}
                const raiddetect = new db.crearDB('raiddetect', 'data_guilds');
                if(raiddetect.tiene(message.guild.id)){embed.addField('👀 | Detectar raideos.', '`Armado.`', true)}else{embed.addField('👀 | Detectar raideos.', '`Desarmado.`', true)}
                embed.setColor(embedColorBlue);
                msg.delete();
                message.channel.send(embed);    
            }, 2000);
        });
    }
}