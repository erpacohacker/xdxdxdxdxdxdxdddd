const Discord = require('discord.js');
const alexa = require('alexa-bot-api');
const chalk = require('chalk');
const {token, embedColorBlue, newPrefix, apelacion, maliciousChannel, createGuild, agencia } = require('../config.json');
const package = require('../package.json');
const db = require('megadb');
const Myprefix = new db.crearDB('prefix', 'data_guilds');
const maliciosos = new db.crearDB('maliciosos', 'data_ids');
const prohibidos = new db.crearDB('prohibidos', 'data_ids');
const { readdirSync } = require('fs');
const client = new Discord.Client();
const ops = '¿?';
client.comandos = new Discord.Collection();
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];
servers = ['786972475228422154', '786973861966250056', '786975171696263200', '702569588537294860', '805864782485258311', '756429127820771359', '808019956661878834', '820092149567717386', '736513746343690251', '819404349037215797'];

module.exports = async (client, message) => {
    if(!message.guild)return;
    if(!message.guild.available)return;

    //Servidores bloqueados
    if(servers.includes(message.guild.id)) {
        if(message.author.bot)return;
        message.channel.send('¡Oops!\n\nEste servidor está bloqueado, completamente :D.').then(a => {
            client.guilds.cache.get(message.guild.id).leave();
        });
    }

    //Server con pocos miembros
    if(message.guild.memberCount <= 3) {
        if(!message.author.bot) {
            message.channel.send(new Discord.MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL()).setDescription(`¡El servidor no tiene los miembros requeridos para añadir a \`SP AGENCY\`!\n\n> Debes obtener 3 usuarios en tu servidor.\n> Si fue un error, contacta con el [Servidor De Soporte](https://discord.gg/pRBRb9E4pj)`).setColor('5c4fff')).catch(err => { message.guild.leave(); console.log(err); })
            setTimeout(() => {
                message.guild.leave();
            }, 2000);
        }
    }

    //Ping al bot.
    async function ping() {
        let img = message.mentions.users.first();
        if(!img)return;
        var prefix;
        if(Myprefix.tiene(message.guild.id)) {
            prefix = await Myprefix.obtener(message.guild.id);
        }else{ prefix = 'sp!'; }
        if(img.id == client.user.id) {
            if(message.content.endsWith('online')) {
                if(message.channel.id == '812664717986234369') {
                    const dev = new db.crearDB('devsActivos', 'data_ids');
                    const d = await dev.obtener('devs');
                    if(d.includes(message.author.id)) {
                        message.delete();
                        message.reply('Tú ya estás activo.').then(x => x.delete({timeout: 2000}));
                        return;
                    }
                    dev.push('devs', message.author.id);
                    message.delete();
                    message.channel.send('Entendido, te he añadido a la lista.').then(x => x.delete({timeout: 3000}));
                }
            }else if(message.content.endsWith('offline')) {
                if(message.channel.id == '812664717986234369') {
                    const dev = new db.crearDB('devsActivos', 'data_ids');
                    const d = await dev.obtener('devs');
                    if(!d.includes(message.author.id)) {
                        message.delete();
                        message.reply('Tú no estás añadido como Developer Activo.').then(x => x.delete({timeout: 3000}));
                        return;
                    }
                    dev.extract('devs', message.author.id);
                    message.delete();
                    message.channel.send('Entendido, te he retirado de la lista.').then(x => x.delete({timeout: 3000}));
                }
            }else if(message.content.endsWith('help')) {
                const embed = new Discord.MessageEmbed().setDescription(`El prefix de **${message.guild.name}** es \`${prefix}\`\nNuevo comando añadido: \`${prefix}raiddetect\``).addField('<:flechas:780209789816537129> ¿Quieres más sobre SP Agency?', '> [¿Cómo uso a SP Agency?](https://youtu.be/72I1ROTBwcQ)\n> [¿SP Agency es buen bot antiraider?](https://youtu.be/CCtlOrbcjSA)', true).setColor('5c4fff')
                message.channel.send(embed);
                return;
            }else{
                const ai = new alexa();
                console.log(chalk.red('ENTRADA ('+message.author.tag+'): ')+ chalk.yellow(message.content));
                ai.getReply(message.content).then(reply => {
                    message.channel.send(reply);
                    console.log(chalk.red('SALIDA: ')+ chalk.yellow(reply));
                });
            }
        }
    } ping();

    //Usuarios muteados.
    async function off() {
        const offUser = new db.crearDB('muteados', 'moderador_automatico');
        if(offUser.tiene(message.guild.id)) {
            let off = await offUser.obtener(message.guild.id);
            if(off.includes(message.author.id)) {
                message.delete();
            }
        }
    } off();
    
    async function detect() {
        const raiddetect = new db.crearDB('raiddetect', 'data_guilds');
        const msgs = new db.crearDB('basicAntiflood', 'moderador_automatico');
        
        if(raiddetect.tiene(message.guild.id)) {
        if(!raiddetect.tiene(message.guild.id))return;

            if(message.content.includes('@everyone') || message.content.includes('@here')) {
                const raid = await raiddetect.obtener(message.guild.id);
                if(raid == 5) {
                    let member = message.guild.member(message.author);
                    let fecha = new Date();
                    member.kick(`Ha hecho 5 pings a everyone/here en menos de 3 segundos en #${message.channel.name}.\n${fecha.getDay()+1}/${fecha.getMonth()+1}/${fecha.getFullYear()}`);
                }else{
                    raiddetect.sumar(message.guild.id, 1);
                }

            /*}else if(message.content.includes('@')) {
                const raid = await raiddetect.obtener(message.guild.id);
                if(raid == 5) {
                    let member = message.guild.member(message.author);
                    let fecha = new Date();
                    member.kick(`Ha hecho 5 pings a roles/usuarios en menos de 3 segundos en #${message.channel.name}.\n${fecha.getDay()+1}/${fecha.getMonth()+1}/${fecha.getFullYear()}`);
                }else{
                    raiddetect.sumar(message.guild.id, 1);
                }*/

            }else{
                if(message.author.bot)return;
                let event = message;
                if(!msgs.tiene(event.author.id)) {
                    msgs.establecer(event.author.id, event.content);
                }
                let msg_content = await msgs.obtener(event.author.id);
                if(msg_content == event.content) {
                    const detectar = new db.crearDB('antiflooddetect', 'moderador_automatico');
                    if(!detectar.tiene(message.author.id)) {
                        detectar.establecer(message.author.id, 0);
                        return;
                    }
                    detectar.sumar(message.author.id, 1);
                    let detectado = await detectar.obtener(message.author.id);
                    if(detectado >= 5) {
                        detectar.eliminar(message.author.id);
                        message.guild.member(message.author).kick(`Flood masivo.`);
                    }
                    event.delete();
                    setTimeout(() => {
                        detectar.eliminar(message.author.id);
                    }, 6000);
                }else{
                    msgs.establecer(event.author.id, event.content);
                }
            }
            setTimeout(() => {
                if(raiddetect.tiene(message.guild.id)) {
                    raiddetect.establecer(message.guild.id, 0);
                }
            }, 4000);
        }
    } detect();

    if(message.channel.type === 'dm')return;
    var prefix;
    if(Myprefix.tiene(message.guild.id)) {
        prefix = await Myprefix.obtener(message.guild.id);
    }else{ prefix = 'sp!'; }
    const pr = await prohibidos.obtener("Prohibidos");
    if (!message.content.startsWith(prefix) || message.author.bot)return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(pr.includes(message.author.id))return;
    if(command === 'me' || command === 'apelar' || command === 'ayuda' || command === 'help' || command === 'links' || command === 'invite')return;
    const malicious = await maliciosos.obtener('Maliciosos');
    if(malicious.includes(message.author.id))return message.channel.send('<a:sp_no:805810577448239154> | `Los usuarios maliciosos no pueden usar comandos.`');
    if(message.content.startsWith(prefix)) console.log(`Server: ${message.guild.name} --- ${message.author.tag} (${message.author.id}) --- ${message.content.slice()}`)
    const {token, embedColorBlue, newPrefix, apelacion, maliciousChannel, createGuild, agencia } = require('../config.json');

    const cmd = client.comandos.get(command) || client.comandos.find(x => x.alias.includes(command))
    if(!cmd) return message.channel.send('<a:sp_no:805810577448239154> | `¡Lástima! Ese comando no existe.`');

    const infoEmbed = new Discord.MessageEmbed().setTitle('<:sp_flecha2:805810542966734860> Información.').setColor(embedColorBlue);
    await cmd.run(client, message, args, ops, prefix, embedColorBlue, newPrefix, apelacion, maliciousChannel, createGuild, agencia, infoEmbed, solo )
}