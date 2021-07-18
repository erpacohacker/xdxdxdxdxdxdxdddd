const Discord = require('discord.js');
const createGuild = '822642842098597958';

module.exports = async (client, guild, embedColorBlue) => {
    let canal = client.channels.cache.get(createGuild);
    const embed = new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL())
    .setTitle("Me Han Expulsado de Un Servidor.")
    .addField("Servidor", `${guild.name} (${guild.id})`)
    .addField("Region", guild.region)
    .addField("Roles", guild.roles.cache.size)
    .addField("Miembros", guild.memberCount)
    //.addField("Dueño", guild.owner.user.username + "#" + guild.owner.user.discriminator + "(" + guild.owner.user.id +")",true)
    .setTimestamp()
    .setColor('5c4fff')
    .setFooter(guild.name, guild.iconURL());
    canal.send({ embed });
}