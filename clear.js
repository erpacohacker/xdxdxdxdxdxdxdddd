const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "clear",
    category: "moderacion",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, infoEmbed, embedColorBlue) => {
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Necesito permiso de __Gestionar Mensajes__.')
        if(!message.member.hasPermission("MANAGE_MESSAGES"))return message.channel.send('Necesitas permiso de __Gestionar Mensajes__.')
        let cantidad = parseInt(args[0]);
        if(!cantidad) return message.channel.send('Ingresa una cantidad.');
        if(cantidad > 10000)return message.reply('No voy a borrar más de `10.000` mensajes.')
        const clear = new db.crearDB('commandClear', 'data_commands');
        if(cantidad >= 101) {
            if(!clear.tiene(message.guild.id)){clear.establecer(message.guild.id, cantidad)}
            message.channel.send(`<a:sp_loading:805810562349006918> | \`Estoy preparando mi base para borrar ${cantidad} mensajes.\``)
            setInterval(async (interval) => {
                let count = await clear.obtener(message.guild.id);
                if(count >= 101) {
                    clear.restar(message.guild.id, 100);
                    message.channel.bulkDelete(100);
                    message.channel.send(`He borrado 100 mensajes de ${count}.`);
                }
                if(count <= 100) {
                    message.channel.send(`He borrado los últimos ${count} mensajes.`)
                    clear.eliminar(message.guild.id);
                    message.channel.bulkDelete(count);
                }
                if(count == 0)return;
            }, 2500);
        }else{
        message.channel.bulkDelete(cantidad);
        message.channel.send(`Se han borrado ${cantidad} mensajes`).then((response) => {
            response.delete({timeout:5000});
            });
        }
    }
}