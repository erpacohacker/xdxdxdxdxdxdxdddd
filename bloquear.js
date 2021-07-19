const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "bloquear",
    category: "staff",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        if(!parseInt(args[0]))return message.reply('Ingresa una id.');
        const prohibir = new db.crearDB('prohibidos', 'data_ids');
        const pr = await prohibir.obtener('Prohibidos');
        if(pr.includes(args[0])) {
            message.channel.send('<a:sp_si:805810572599099413> | `Esa persona ya estaba bloqueada.`')
        }else{
            message.channel.send(`<@${args.join(' ')}> ha sido bloqueado en el bot.`);
            prohibir.push("Prohibidos", args.join(' '));
        }
    }
}