const Discord = require ('discord.js') // I KNOW, I KNOW DISCORD.JS V12, GO CRY ABOUT IT NOOB
const bot = new Discord.Client()
const fs = require("fs"); 
const fivem = require("discord-fivem-api"); 
const server = new fivem.DiscordFivemApi('SERVER_IP_HERE');
const Gamedig = require('gamedig'); 
const { channel } = require('diagnostics_channel');
bot.commands = new Discord.Collection();


// SOME PEOPLE MAY HAVE CONFIG FILE, BUT IM GONNA MAKE YOU WORK FOR THIS SHIT. GOOD LUCK NOOB(I WAS TOO LAZY TO MAKE ONE, SO FUCK YOU)
bot.on('ready', () => {
    bot.user.setStatus('dnd')
    console.log('Bot is now online')
    let i = 0;
    fs.readdir('./commands', (err, files) => {
        if(err) return console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() == 'js');
        if(jsfile.lenght <=0) return console.log("Could not find any commands!")
        jsfile.forEach(f => {
            let props = require(`./commands/${f}`);
            bot.commands.set(props.help.name, props)
        }) 
    })
})



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7
bot.on('message', (message) => {
    if(message.author.bot) return;
    if(message.channel.type !== 'text') return;
    let prefix = '.'; // CHANGE THE BOTS PREFIXS HERE
    let MessageArray = message.content.split(' ');
    let cmd = MessageArray[0].slice(prefix.length)
    let args = MessageArray.slice(1)
    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd);
    if(commandfile) {commandfile.run(bot, message, args)}
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7 
let state = null;

// this shit basically changes the channel name to Current AOP: Current AOP. It updates every 5 minutes. I do not recommend changing the update time, but you do you.
bot.on("ready", () => {
  const guild = bot.guilds.cache.get('GUILD_ID_HERE');
Gamedig.query({
  type: 'fivem',
  host: '', // Server IP here
  port: "" // Server Port here               //state.map
}).then(async(state) => {
 setInterval(() => {
 
      const channel = guild.channels.cache.get('CHANNEL_ID_HERE')
      channel.setName(`Current AOP: ${state.map}`)
  }, 300000);
    
}).catch(async(err) => {
 return console.log("The server is offline or something broke aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
})
})

// this shit updates every 5 minutes, dont lower it, or do if you know what youre doing...
  bot.on('ready', () => {
    setInterval(() => {
      Gamedig.query({
        type: 'fivem',
        host: '', // SERVER IP HERE
        port: '', // SERVER PORT HERE
      }).then(async(state)  => {
         
          const maxplayers = state.maxplayers;
          const players = state.players.length;
        
        
          bot.channels.cache.get("CHANNEL_ID_HERE").setName(`Players online: ${players}/${maxplayers}`) 
        })
        .catch((e) => {
          console.log(e);
        });
    }, 300000);
});
  
//PLaying a game(Fivem shit)
bot.on('ready', () => {
  setInterval(() => {
    Gamedig.query({
      type: 'fivem',
      host: '', // SERVER IP HERE
      port: '', // SERVER PORT HERE
    }).then(async(state)  => {
       
        const maxplayers = state.maxplayers;
        const players = state.players.length;
        bot.user.setActivity(`${players}/${maxplayers} Players`);
      })
      .catch((e) => {
        console.log(e);
      });
  }, 10000);
});

bot.login("DISCORD_TOKEN_HERE")