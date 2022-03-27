const Discord = require ('discord.js')
const Gamedig = require('gamedig');
exports.run = async (bot,message,args) => {
if (message.author.bot) return;
let state = null;
message.delete()
Gamedig.query({
    type: 'fivem',
    host: '', // Server IP here
    port: "" // Server Port here              
}).then(async(state) => {
    const embed = new Discord.MessageEmbed()
    .setDescription(`The current AOP is ${state.map}`)
    .setColor("RANDOM") // wooow, random
    .setFooter(`THIS IS A FOOTER`, bot.user.displayAvatarURL())
    .setTimestamp();
  message.channel.send(embed).then(message => message.delete({timeout: 10000}));
});    
}

exports.help = {
    name: 'aop'
        
}