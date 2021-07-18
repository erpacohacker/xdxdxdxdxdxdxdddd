const Discord = require('discord.js');
const db = require('megadb');
const package = require('../package.json');
const maliciosos = new db.crearDB('maliciosos', 'data_ids');
const prohibidos = new db.crearDB('prohibidos', 'data_ids');
const descp = 'Raiddetect v2.';
const versionStatus = 'Estable.';
const dato = new Date();
const data = dato.getMonth()+1;

module.exports = async (client, ready) => {
  const users = client.users.cache.size;
  const pr = await prohibidos.obtener("Prohibidos");
  const malicious = await maliciosos.obtener('Maliciosos');
  client.channels.cache.get('822644023813603338').bulkDelete(100);
  client.channels.cache.get('822644023813603338').send('<a:sp_si:805810572599099413> | `'+descp+'`\n\n> `'+package.version+' ['+versionStatus+']`\n> Actualizado el `'+dato.getDate()+'/'+data+'/'+dato.getFullYear()+'` a las `'+dato.getHours()+':'+dato.getMinutes()+':'+dato.getSeconds()+'`');
  const dev = new db.crearDB('devsActivos', 'data_ids');
  const asde = await dev.obtener('devs');
  let uno; let dos;
  if(asde.length >= 1) {
    uno = `<@${asde[0]}> <a:sp_loading:805810562349006918> | \`Más reciente\` `;
    dos = `<@${asde[asde.length - 1]}> <:sp_developer:805810545507696700> | \`Primer Developer Conectado\` `;
  }
    let canal = client.channels.cache.get('822643890485198848');
    canal.bulkDelete(1);
    canal.send(new Discord.MessageEmbed().setDescription('**__Developers Online Trabajando En SP Agency Actualmente__**\n\n`Acabo de ser actualizado, Cargando...`').setColor(0x5c4fff)).then(editar => {
      
      setInterval(async () => {
      let estado = ['Error.', `${pr.length} usuarios prohibidos.`, `${client.guilds.cache.size} servidores.`, `${malicious.length} usuarios maliciosos.`, `versión ${package.version}`, `sp!comandos, sp!setprefix (Prefix custom)`];
      const index = Math.floor(Math.random() * (estado.length - 1) + 1);
      client.user.setPresence({ activity: { name: estado[index], type: "WATCHING" }, status: 'dnd' });
      
      const asd = await dev.obtener('devs');
      if(asd.length <= 0)return editar.edit(new Discord.MessageEmbed().setDescription('**__Developers Online Trabajando En SP Agency Actualmente__**\n\n<a:sp_loading:805810562349006918> | `¡No hay developers trabajando ahora mismo!`').setColor(0x5c4fff))
      let contador = 1;
      let array = [];
      asd.forEach(x => {
        array.push(`<@${x}>`);
      });
      if(asd[0] != uno) {
        array[0] = `<@${asd[0]}> <a:sp_loading:805810562349006918> | \`Más reciente\` `;
      }
      if(asd[asd.length - 1] != dos) {
        array[array.length - 1] = `<@${asd[asd.length - 1]}> <:sp_developer:805810545507696700> | \`Primer Developer Conectado\` `;
      }
      editar.edit(new Discord.MessageEmbed().setDescription('**__Developers Online Trabajando En SP Agency Actualmente__**\n\n'+array.map(x => `\`${contador++}-\` ${x}`).join('\n')).setColor(0x5c4fff));
    },5000);
  });
}