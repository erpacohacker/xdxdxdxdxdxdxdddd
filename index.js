const Discord = require('discord.js');
const {token, embedColorBlue} = require('./config.json');
const package = require('./package.json');
const db = require('megadb');
const { readdirSync } = require('fs');
const message = require('./eventos/message');
const client = new Discord.Client();
client.comandos = new Discord.Collection();

//------------------------------------
/*----- Command + Event handler -----*/
//------------------------------------

for(const subcarpeta of readdirSync('./comandos/')) { 
    for(const file of readdirSync('./comandos/'+subcarpeta)) { 
        if(file.endsWith(".js")) {
            let fileName = file.substring(0, file.length - 3); 
            let fileContents = require(`./comandos/${subcarpeta}/${file}`); 
            client.comandos.set(fileName, fileContents);
        }
    }
}
    
for(const file of readdirSync('./eventos/')) { 
    if(file.endsWith(".js")){
        let fileName = file.substring(0, file.length - 3); 
        let fileContents = require(`./eventos/${file}`); 
        client.on(fileName, fileContents.bind(null, client)); 
        delete require.cache[require.resolve(`./eventos/${file}`)]; 
    }
}

//------------------------------------
/*----- Command + Event handler -----*/
//------------------------------------

client.on('message', async message => {
    if(message.channel.type === 'dm')return;
    const Myprefix = new db.crearDB('prefix', 'data_guilds');
    var prefix;
    if(Myprefix.tiene(message.guild.id)) {
        prefix = await Myprefix.obtener(message.guild.id);
    }else{ prefix = 'sp!'; }
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const prohibidos = new db.crearDB('prohibidos', 'data_ids');
    const pr = await prohibidos.obtener("Prohibidos");
    const maliciosos = new db.crearDB('maliciosos', 'data_ids');
    const usersData = new db.crearDB('usersData', 'data_ids');
    if(pr.includes(message.author.id))return message.reply('Has sido prohibido al completo en este bot.');
    
    if(command === 'me') {
        const developers = new db.crearDB('developers', 'data_ids');
        let dev = await developers.obtener('Agency');
        if(usersData.tiene(message.author.id)) {
            let {razon, prueba} = await usersData.obtener(message.author.id);
            const embed = new Discord.MessageEmbed()
            .setAuthor(`Información De Lista Negra.`)
            .setDescription(`ID: **${message.author.id}**\nRazón: \`${razon}\``)
            .setImage(prueba).setColor(embedColorBlue);
            message.channel.send(embed);
            if(usersData.tiene(`${message.author.id}.subprueba`)) {
                let {subprueba} = await usersData.obtener(message.author.id);
                const em = new Discord.MessageEmbed().setImage(subprueba).setColor(embedColorBlue);
                message.channel.send(em);
            }
        }
    }else if(command === 'apelar') {
        const apelar = new db.crearDB('apelantes', 'data_ids');
        if(usersData.tiene(message.author.id)) {
            if(apelar.tiene(message.author.id, 'En Espera'))return message.reply('Tu apelación está siendo procesada. Este procedimiento puede tardar unos días/semenas.');
            if(!args.join(' '))return message.reply('Debes escribir una razón decente y formal.');
            if(args.length <= 50)return message.reply('Escribe una razón decente y formal. Mínimo 50 palabras.');
            const embed = new Discord.MessageEmbed()
            .setDescription(`Apelación De solicitud.\n\n**${message.author.tag}** | **${message.author.id}**`)
            .addField(`Apelación:`, `\`${args.join(' ')}\``)
            .setFooter(`Servidor: ${message.guild.name} (${message.guild.id})`)
            client.channels.cache.get('822644014436057088').send(embed);
            message.channel.send(`<@${message.author.id}> acabas de enviar tu apelación. Podrás volver a apelar en caso de que seas rechazado.\n__Si tu apelación no tiene el fin que buscamos y lo usas de mala manera serás bloqueado de las apelaciónes para siempre.__`);
            apelar.establecer(message.author.id, 'Es Espera');
        }else{
            message.channel.send('<a:sp_si:805810572599099413> | `Usted no está marcado como un usuario malicioso.`')
        }
    }else if(command === 'ayuda' || command === 'help' || command === 'links' || command === 'invite') {
        const embed = new Discord.MessageEmbed()
        .setDescription(`<:sp_developer:805810545507696700> ¡Hola <@${message.author.id}>! Mi prefix en este servidor es \`${prefix}\`.\nMi prefix por defecto es \`sp!\`\n
        <:sp_flecha2:805810542966734860> **__¿Necesitas ayuda?__**\n
        **- Visita mi página web [En desarrollo.]\n- Puedes entrar a [mi servidor de soporte](https://discord.gg/3Q7ZMygPZA)\n- Puedes invitarme por: [Link Directo](https://discord.com/oauth2/authorize?client_id=779660400081764393&scope=bot&permissions=8) / [Top.gg](https://top.gg/bot/779660400081764393) / [Aura botList](https://auralist.glitch.me/bots/779660400081764393)**`)
        .setColor(embedColorBlue).setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed);
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
client.on('message', async message => {
    if(message.channel.type === 'dm')return;
    try{
    if(message.member.hasPermission('MANAGE_MESSAGES'))return;
    }catch(err) {}
    const automoderator = new db.crearDB('automoderator', 'moderador_automatico');
    if(automoderator.tiene(message.guild.id)) {
        const warn = new db.crearDB('warns', 'moderador_automatico');
        if(warn.tiene(`${message.guild.id}.${message.author.id}`)) {
            let {warns, moderadores, subcontador} = await warn.obtener(`${message.guild.id}.${message.author.id}`);
            if(warns.length == 2) {
                const offUser = new db.crearDB('muteados', 'moderador_automatico');
                const mute = new db.crearDB('muteUsers', 'data_commads');
                if(!offUser.tiene(message.guild.id)) {offUser.establecer(message.guild.id, [])}
                if(!mute.tiene(message.author.id)) {
                    offUser.push(message.guild.id, message.author.id);
                    message.channel.send(`He muteado durante 5 minutos a <@${message.author.id}> por tener demasiadas infracciónes.`);
                    mute.establecer(message.author.id, 'Muteado');
                    setTimeout(() => {
                        offUser.eliminar(message.guild.id, message.author.id);
                        message.channel.send(`<@${message.author.id}> ha sido desmuteado.`);
                    }, 300000);
                }
            }
            if(warns.length >= 4) {
                const mute = new db.crearDB('muteUsers', 'data_commads');
                mute.eliminar(message.author.id);
                if(automoderator.tiene(message.guild.id, 'kick')) {
                    message.author.send('Has sido expulsado de `'+message.guild.name+'`.\n\n**Moderador:** `'+client.user.id+'`\n**Razón:** `Demasiadas Infracciónes.`').then(msg => {
                        message.channel.send(`<a:sp_loading:805810562349006918> | \`Estoy Expulsando a ${message.author.tag} por tener demasiadas infracciónes.\``).then(b => {
                            const kickEmbed = new Discord.MessageEmbed()
                            .setDescription(`**__Miembro Expulsado:__** <@${message.author.id}> (${message.author.id})\n**__Moderador:__** <@${client.user.id}> (${client.user.id})\n**__Razón:__** \`Demasiadas Infracciónes\``)
                            .setColor(embedColorBlue);
                            message.guild.member(message.author).kick({reason: 'Demasiadas Infracciónes.'});
                            b.delete();
                            message.channel.send(kickEmbed);
                        });
                    });
                }else if(automoderator.tiene(message.guild.id, 'ban')) {
                    message.author.send('Has sido baneado de `'+message.guild.name+'`.\n\n**Moderador:** `'+client.user.id+'`\n**Razón:** `Demasiadas Infracciónes.`').then(msg => {
                        message.channel.send(`<a:sp_loading:805810562349006918> | \`Estoy Baneando a ${message.author.tag} por tener demasiadas infracciónes.\``).then(b => {
                            const kickEmbed = new Discord.MessageEmbed()
                            .setDescription(`**__Miembro Baneado:__** <@${message.author.id}> (${message.author.id})\n**__Moderador:__** <@${client.user.id}> (${client.user.id})\n**__Razón:__** \`Demasiadas Infracciónes\``)
                            .setColor(embedColorBlue);
                            message.guild.member(message.author).ban({reason: 'Demasiadas Infracciónes.'});
                            b.delete();
                            message.channel.send(kickEmbed);
                        });
                    });
                }
            }
        }
                
        if(message.content.includes('http')||message.content.includes('discord.gg')||message.content.includes('www.')) {
            if(!warn.tiene(`${message.guild.id}.${message.author.id}`)) {warn.set(`${message.guild.id}.${message.author.id}`, {warns: [], moderadores: [], subcontador: 0})}
            const {warns, moderadores, subcontador} = await warn.obtener(`${message.guild.id}.${message.author.id}`);
            if(subcontador == 0) {
                message.delete();
                warn.sumar(`${message.guild.id}.${message.author.id}.subcontador`, 1);
            }else if(subcontador == 1) {
                message.delete();
                warn.sumar(`${message.guild.id}.${message.author.id}.subcontador`, 1);
                message.channel.send('<@'+message.author.id+'>. Si vuelves a hacer spam te sancionaré.');
            }else if(subcontador == 2) {
                message.delete()
                warn.restar(`${message.guild.id}.${message.author.id}.subcontador`, 2);
                warn.push(`${message.guild.id}.${message.author.id}.warns`, 'Spam Link.');
                warn.push(`${message.guild.id}.${message.author.id}.moderadores`, client.user.id);
                const embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> | ${message.author.id} ha sido warneado.\n\nModerador: <@${client.user.id}>\nRazón: \`Spam Link.\`\nAhora tiene \`${warns.length}\` warns.`)
                .setColor(embedColorBlue);
                message.channel.send(embed);
            }

        }else if(message.content.includes('@everyone')||message.content.includes('@here')) {
            if(!warn.tiene(`${message.guild.id}.${message.author.id}`)) {warn.set(`${message.guild.id}.${message.author.id}`, {warns: [], moderadores: [], subcontador: 0})}
            const {warns, moderadores, subcontador} = await warn.obtener(`${message.guild.id}.${message.author.id}`);
            if(subcontador == 0) {
                message.delete();
                warn.sumar(`${message.guild.id}.${message.author.id}.subcontador`, 1);
            }else if(subcontador == 1) {
                message.delete();
                warn.sumar(`${message.guild.id}.${message.author.id}.subcontador`, 1);
                message.channel.send('<@'+message.author.id+'>. Si vuelves a hacer ping te sancionaré.');
            }else if(subcontador == 2) {
                message.delete()
                warn.restar(`${message.guild.id}.${message.author.id}.subcontador`, 2);
                warn.push(`${message.guild.id}.${message.author.id}.warns`, 'Ping a everyone/here.');
                warn.push(`${message.guild.id}.${message.author.id}.moderadores`, client.user.id);
                const embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> | ${message.author.id} ha sido warneado.\n\nModerador: <@${client.user.id}>\nRazón: \`Ping a everyone/here.\`\nAhora tiene \`${warns.length}\` warns.`)
                .setColor(embedColorBlue);
                message.channel.send(embed);
            }

        }else if(message.content.slice(0).length >= 500) {
            if(!warn.tiene(`${message.guild.id}.${message.author.id}`)) {warn.set(`${message.guild.id}.${message.author.id}`, {warns: [], moderadores: [], subcontador: 0})}
            const {warns, moderadores, subcontador} = await warn.obtener(`${message.guild.id}.${message.author.id}`);
            if(subcontador == 0) {
                message.delete();
                warn.sumar(`${message.guild.id}.${message.author.id}.subcontador`, 1);
            }else if(subcontador == 1) {
                message.delete();
                warn.sumar(`${message.guild.id}.${message.author.id}.subcontador`, 1);
                message.channel.send('<@'+message.author.id+'>. Si vuelves a poner un mensaje tan extenso te sancionaré.');
            }else if(subcontador == 2) {
                message.delete()
                warn.restar(`${message.guild.id}.${message.author.id}.subcontador`, 2);
                warn.push(`${message.guild.id}.${message.author.id}.warns`, 'Inundar El Chat.');
                warn.push(`${message.guild.id}.${message.author.id}.moderadores`, client.user.id);
                const embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> | ${message.author.id} ha sido warneado.\n\nModerador: <@${client.user.id}>\nRazón: \`Inundar El Chat.\`\nAhora tiene \`${warns.length}\` warns.`)
                .setColor(embedColorBlue);
                message.channel.send(embed);
            }
        }
    }
});

//raiddetect
try{
client.on('channelCreate', async channel => {
    const raiddetect = new db.crearDB('raiddetect', 'data_guilds');
    if(channel.type === 'dm')return;
    if(!raiddetect.tiene(channel.guild.id))return;
    if(raiddetect.tiene(channel.guild.id)) {
        const raid = await raiddetect.obtener(channel.guild.id);
        if(raid == 3) {
            channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(logs => {
                let persona = logs.entries.first().executor;
                channel.guild.member(persona).ban({reason: "Raid."});
            });
            setTimeout(() => {
                raiddetect.establecer(channel.guild.id, 0);
            }, 2000);
        }else{
            raiddetect.sumar(channel.guild.id, 1);
        }
    }

    //ANTISLOW ATACKS
    const antislow = new db.crearDB('antislow_atacks', 'data_guilds');
    if(antislow.tiene(channel.guild.id)) {
        const araid = await antislow.obtener(channel.guild.id);
        if(araid >= 3) {
            channel.delete();
            antislow.establecer(channel.guild.id, 0);
            channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE' }).then(logs => {
                let persona = logs.entries.first().executor;
                channel.guild.member(persona).ban({reason: "Raid."});
            });
        }else{
            channel.delete();
            antislow.sumar(channel.guild.id, 1);
        }
        setTimeout(() => { antislow.restar(channel.guild.id, 1); }, 15000);
    }
});
client.on('channelDelete', async channel => {
    const raiddetect = new db.crearDB('raiddetect', 'data_guilds');
    if(raiddetect.tiene(channel.guild.id)) {
        const raid = await raiddetect.obtener(channel.guild.id);
        if(raid == 3) {
            channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE' }).then(logs => {
                let persona = logs.entries.first().executor;
                channel.guild.member(persona).ban({reason: "Raid."});
            });
            setTimeout(() => {
                raiddetect.establecer(channel.guild.id, 0);
            }, 2000);
        }else{
            raiddetect.sumar(channel.guild.id, 1);
        }
    }
});
}catch(err) { let i=1;console.log(`Error ${i++}, sistema antiraid`); }


client.login(token).then(() => { console.log(`${client.user.tag} se ha conectado, versión: ${package.version}`) });