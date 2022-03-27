const Discord = require ('discord.js')
const fivem = require("discord-fivem-api");
const server = new fivem.DiscordFivemApi('IP_HERE'); // server IP goes here btw
const Gamedig = require('gamedig');
exports.run = async (bot,message,args) => {
if (message.author.bot) return;
message.delete()
Gamedig.query({
  type: 'fivem',
  host: '', // Server IP here
  port: "" // Server Port here             
}).then(async(state) => {
  const maxplayers = state.maxplayers;
server.getPlayers().then((data) => {
  let result  = [];
  let index = 1;
  for (let player of data) {
    result.push(`**${index++}**. ${player.name} | ${player.id} ID\n`);
  }
  const embed = new Discord.MessageEmbed()
    .setColor("#0080FF")
    .setAuthor(`Requested by ${message.author.tag}`, (`${message.author.displayAvatarURL({ dynamic: true })}`))
    .setTitle(`Players currently online (${data.length}/${maxplayers})`)
    .setDescription(result.length > 0 ? result : 'No players online!')
    .setFooter(`Footer wooow`)
    .setTimestamp();
  message.channel.send(embed).then(message => message.delete({timeout: 10000}));
  
}).catch((err) => {
  const offlineembed = new Discord.MessageEmbed()
  .setColor("#0080FF")
  .setAuthor("Server is offline")
  .setFooter("Check back later!")
  .setTimestamp();
message.channel.send(offlineembed).then(message => message.delete({timeout: 10000}));
})

});
}




exports.help = {
    name: 'status'
        
}