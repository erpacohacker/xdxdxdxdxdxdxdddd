const Discord = require('discord.js');
const db = require('megadb');

module.exports = async (client, member, maliciousChannel, embedColorBlue) => {
    //Warn entry.
    const warnEntry = new db.crearDB('warnMaliciousEntry', 'data_guilds');
    if(warnEntry.tiene(member.guild.id)) {
        const maliciosos = new db.crearDB('maliciosos', 'data_ids');
        let malicious = await maliciosos.obtener('Maliciosos');
        if(malicious.includes(member.user.id)) {
            const embed = new Discord.MessageEmbed()
            .setDescription(`Un usuario malicioso ha sido detectado en \`${member.guild.name}\`.\n\n**- Con el __El Detector De Usuarios Maliciosos__ activado, el *Equipo De Soporte SP* puede expulsar a <@${member.user.id}> (${member.user.id}) del servidor** \`${member.guild.name} (${member.guild.id})\`.`)
            .addField('Datos Del usuario:', `Tag: **${member.user.tag}**\nID: **${member.user.id}**`)
            .setFooter(`Atentamente: SP Agency.`).setColor(0x5c4fff);
            let ownerid = member.guild.owner;
            ownerid.send(embed);
            const emebd2 = new Discord.MessageEmbed()
            .setDescription(`Usuario Malicioso Detectado En \`${member.guild.name} (${member.guild.id})\``)
            .addField(`Usuario:`, `<@${member.user.id}> (${member.user.id})`, true)
            .setTimestamp().setColor(0x5c4fff);
            client.channels.cache.get('822649641715630151').send(emebd2);
        }
    }
    //Antijoins.
    const antijoins = new db.crearDB('antijoins', 'data_guilds');
    if(antijoins.tiene(member.guild.id)) {
        const kickEmbed = new Discord.MessageEmbed()
        .setDescription(`<:sp_flecha2:805810542966734860> <@${member.user.id}> has sido expulsado de \`${member.guild.name}\`.\n\`El servidor tenía activada la expulsión de nuevos usuarios.\`\n\n**__Si necesitas__ contactar con nosotros ve a [Nuestro Servidor De Soporte](https://discord.gg/3Q7ZMygPZA)**.`)
        .setFooter(`Atentamente: SP Agency.`).setColor(0x5c4fff);
        member.send(kickEmbed);
        member.guild.member(member).kick('Anti Nuevos Usuarios Activado.')
        return;
    }
    //Antibots
    const antibots = new db.crearDB('antibots', 'data_guilds');
    if(!antibots.tiene(member.guild.id))return;
    if(member.user.bot) {
        member.guild.member(member).kick('Bot.');
        const embed = new Discord.MessageEmbed()
        .setDescription('Un sujeto ha sido verificado como bot y ha sido expulsado por seguridad.')
        .setColor(0x5c4fff);
        console.log('Bot expulsado en '+member.guild.name+', expulsar bots.');
    }
    //Setwelcome
    let bienvenida = new db.crearDB('welcome', 'data_guilds');
    if(bienvenida.tiene(member.guild.id)) {
        let {canal, mensaje} = await bienvenida.obtener(member.guild.id);
        let canal2 = client.channels.cache.get(canal);
        canal2.send(`<@${member.user.id}>,\n\n${mensaje}`);
    }
    //Entrada en la private
    if(member.guild.id == '782308079588343849') {
        const dato = new Date();
        const data = dato.getMonth()+1;
        client.channels.cache.get('782657924022665216').send(`Trabajador: ${member.user.id}, fecha: ${dato.getDate()+'/'+data+'/'+dato.getFullYear()}`)
    }
}