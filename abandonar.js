const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "abandonar",
    category: "staff",
    alias: ['a'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        message.channel.send(`Entendido <@${message.author.id}> (Creador)\n\nAbandonaré este servidor y no volveré a dejar que me añadan a este de nuevo.`).then(a => {
            client.guilds.cache.get(message.guild.id).leave();
        });
    }
}