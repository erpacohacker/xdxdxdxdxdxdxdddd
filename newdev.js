const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "newdev",
    category: "staff",
    alias: ['nd'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        const developers = new db.crearDB('developers', 'data_ids');
        const devlist = new db.crearDB('devlist', 'data_ids');
        if(!args[0])return message.reply('Escribe una id.');
        if(!parseInt(args[0]))return message.reply('Escribe una id.');
        if(!args[1])return message.reply('Escribe el nivel del nuevo dev: `básico/medio/alto`');
        if(!args[1] == 'básico' || !args[1] == 'medio' || !args[1] == 'alto')return message.reply('Ese no era un nivel.');
        let dev = await developers.obtener('Agency');
        if(dev.includes(args.join(' ')))return message.reply('Esa persona ya es de la agencia.');
        developers.push('Agency', args[0]);
        devlist.establecer(args[0], args[1]);
        message.channel.send(`\`${args.join(' ')}\` ahora es staff de SP Agency.`);
    }
}