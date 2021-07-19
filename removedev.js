const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "removedev",
    category: "staff",
    alias: ['rd'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        const developers = new db.crearDB('developers', 'data_ids');
        let dev = await developers.obtener('Agency');
        if(!args.join(' '))return message.reply('Escribe una id.');
        if(!parseInt(args[0]))return message.reply('Escribe una id.');
        const devlist = new db.crearDB('devlist', 'data_ids');
        if(!dev.includes(args.join(' ')))return message.reply('Esa persona no es de la agencia.');
        developers.extract('Agency', args.join(' '));
        devlist.eliminar(args[0]);
        message.channel.send(`\`${args.join(' ')}\` ya no es staff de SP Agency.`)
    }
}