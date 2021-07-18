const Discord = require('discord.js');
const createGuild = '822642842098597958';

module.exports = async (client, guild) => {
    let canal = client.channels.cache.get(createGuild);
    const embed = new Discord.MessageEmbed()
    .setThumbnail(guild.iconURL())
    .setTitle("Nuevo Servidor.")
    .addField("Servidor", `${guild.name} (${guild.id})`)
    .addField("Region", guild.region)
    .addField("Roles", guild.roles.cache.size)
    .addField("Miembros", guild.memberCount)
    //.addField("Dueño", guild.owner.user.username + "#" + guild.owner.user.discriminator + "(" + guild.owner.user.id +")",true)
    .setTimestamp()
    .setColor('5c4fff')
    .setFooter(guild.name, guild.iconURL());
    canal.send({ embed });

    if(guild.memberCount <= 3) {
        let alea = [];
        guild.channels.cache.forEach(canales => {
        alea.push(canales.id);
        });
        let aleo = alea[Math.floor(Math.random() * alea.length)];
        
        client.channels.cache.get(aleo).send(new Discord.MessageEmbed().setAuthor(guild.name, guild.iconURL()).setDescription(`¡El servidor no tiene los miembros requeridos para añadir a \`SP AGENCY\`!\n\n> Debes obtener 3 usuarios en tu servidor.\n> Si fue un error, contacta con el [Servidor De Soporte](https://discord.gg/3Q7ZMygPZA)`).setColor('5c4fff')).catch(err => { guild.leave(); console.log(err); });
        setTimeout(() => {
            guild.leave();
        }, 2000);
    }
}