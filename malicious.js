const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794', '725869180984885349'];
const maliciouslog = new db.crearDB('maliciouslog');

module.exports = {
    nombre: "malicious",
    category: "staff",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        let txt = message.content.slice(prefix.length + 9).trim().split('-');
        if(!args.join(' '))return message.reply('Orden para añadir un usuario malicioso: `'+prefix+'malicious ID DEL USUARIO MALICIOSO - RAZÓN - UNA FOTO QUE LE CONDENE`');
        const maliciosos = new db.crearDB('maliciosos', 'data_ids');
        let usuarios = await maliciosos.obtener('Maliciosos');
        if(usuarios.includes(txt[0]))return message.reply('Esa persona ya ha sido añadida.');
        const usersData = new db.crearDB('usersData', 'data_ids');
        maliciosos.push('Maliciosos', txt[0]);
        usersData.establecer(txt[0], {razon: txt[1], prueba: txt[2]});

        if(message.author.id == '725869180984885349') { maliciouslog.push(txt[0]); }

        const embed = new Discord.MessageEmbed()
        .setAuthor(`Nuevo Usuario En Lista Negra.`)
        .setDescription(`ID: **${txt[0]}**\nRazón: \`${txt[1]}\`\nPrueba: **${txt[2]}**`)
        .setColor('5c4fff');
        message.channel.send(embed);
    }
}