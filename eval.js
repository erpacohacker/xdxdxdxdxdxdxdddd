const Discord = require('discord.js');
const db = require('megadb');
let solo = ['559502596847435827', '571935127295229963', '594639565268975618', '704029952596508794'];

module.exports = {
    nombre: "eval",
    category: "staff",
    alias: [],
    description: "",
    usage: [],
    run: async (client, message, args, ops, prefix, embedColorBlue) => {
        if(!solo.includes(message.author.id))return message.reply('Solo para el creador.');
        function clean(text) {
            if(typeof(text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }
        try {
            const code = args.join(" ");
            if(!args.join(' '))return message.channel.send('Escribe un código para evaluar.');
            let evaled = eval(code);
            if(typeof evaled !== "string") evaled = require("util").inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
        }catch(err) {
            message.channel.send('```diff\n- Error: -\n'+err+'```');
        }   
    }
}