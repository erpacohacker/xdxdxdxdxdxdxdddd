const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "r.malicious",
    category: "staff",
    alias: ['rm', 'r-malicious'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        if(!parseInt(args[0]))return message.reply('Ingresa una id.');
        const usersData = new db.crearDB('usersData', 'data_ids');
        const maliciosos = new db.crearDB('maliciosos', 'data_ids');
        if(usersData.tiene(args[0])) {
        message.channel.send(`\`${args.join(' ')}\` ha sido eliminado de la lista negra.`);
        usersData.eliminar(args.join(' '));
        maliciosos.extract("Maliciosos", args.join(' '));
        }else{
            message.channel.send('<a:sp_si:805810572599099413> | `Esa persona no está marcada como un usuario malicioso.`')
        }
    }
}