const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "delete.channels",
    category: "staff",
    alias: ['dc', 'delete-channels'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        const r = new db.crearDB('raiddetect', 'data_guilds');
        const back_up = new db.crearDB('backups', 'data_guilds');
        const autoBackup = await back_up.obtener(message.guild.id);
        message.guild.channels.cache.forEach(x => x.delete());
        message.author.send('Canales borrados.');
        if(r.tiene(message.guild.id)) {
            backup.load(autoBackup, message.guild);
        }
    }
}