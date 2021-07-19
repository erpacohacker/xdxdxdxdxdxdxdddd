const Discord = require('discord.js');
const db = require('megadb');

module.exports = {
    nombre: "guild",
    category: "staff",
    alias: ['g'],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue, solo) => {
        const developers = new db.crearDB('developers', 'data_ids');
        let dev = await developers.obtener('Agency');
        if(!dev.includes(message.author.id))return message.reply('Ese comando es solo para el equipo de la Agencia.');
        let guild = client.guilds.cache.get(args[0]);
        if(!guild) return message.channel.send("El bot no está en esta guild.")
        let codigo = await guild.channels.cache.filter(m => m.type == "text").random().createInvite()
        if(codigo === undefined) return message.channel.send("Ups, parece que ocurrió un error. Intenta nuevamente")
        message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL()).setDescription(`**Invitación de [\`__${guild.name}__\`] [Link](${codigo})**`))
    }
}