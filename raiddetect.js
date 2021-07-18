const Discord = require('discord.js');
const db = require('megadb');
const raiddetect = new db.crearDB('raiddetect', 'data_guilds');
const asd = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor('5c4fff');

module.exports = {
    nombre: "raiddetect",
    category: "proteccion",
    alias: ['antiraid', 'rd'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        try{
            let Mauthor = message.author.id;
            let Sowner = message.guild.owner.id;
            if(Mauthor == Sowner) {
                if(raiddetect.tiene(message.guild.id)) {
                    raiddetect.eliminar(message.guild.id);
                    asd.setDescription('`Ya no detecto raids.`');
                    message.channel.send(asd);
                    return;
                }
                if(!raiddetect.tiene(message.guild.id)) {
                    raiddetect.establecer(message.guild.id, 0);
                    asd.setDescription('`Ahora detecto y detengo raids.`');
                    message.channel.send(asd);
                    return;
                }
            }else{
                message.channel.send('Necesitas ser __El Propietario De Este Servidor__.');
            }
        }catch{
            message.channel.send('Necesitas ser __El Propietario De Este Servidor__.');
        }
    }
}