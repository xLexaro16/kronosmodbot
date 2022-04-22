const {Client, 
      Collection, 
       Discord
      } = require("discord.js");
const client = new Client({
  disableEveryone: true
});
const { default_prefix } = require("./config.json")
const { config } = require('dotenv')
const { prefix } = require("./config.json")
const bot = new Client({
  disableEveryone: true
});
 require('discord-buttons')(client);
const emote = require("./config/emotes.json");
const { MessageEmbed } = require('discord.js');
const ms = require("ms");
const fetch = require("fetch");
const db = require("quick.db")
let number = 69
console.log('\x1b[36m%s\x1b[0m','[100 CMD BOT] 100 Commands Bot is Running!')
console.log('\x1b[36m%s\x1b[0m','[100 CMD BOT] Version: V1.0 [OFFICIAL]')
console.log('\x1b[35m%s\x1b[0m','[SETUP] If you have a problem with the bot, please read SETUP.md or DM the Developer: Lexaro')
console.log('\x1b[37m%s\x1b[0m','---------------------------------------------------------')
console.log('\x1b[33m%s','[CONFIG] Number Loading... [Index.js >> Line 20]')
console.log('\x1b[32m%s',`[CONFIG] Number = ${number}`) //correct method
console.log('\x1b[33m%s\x1b[36m','[COMMANDS] Loading Commands...')

//----Handler------
client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

// HOST

require("http").createServer((req, res) => res.end(`Bot Is Online.`)).listen(process.env.PORT || 8000)


//------------------------Snipe--------------------------

client.snipes = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author.tag,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});


//--------Message-------
client.on('message', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;
  if (command) command.run(client, message, args);});


//
client.on('message', async (message) => {
  if(message.content.includes(client.user.id)) {
    const embed = new MessageEmbed()
    .setTitle(`Hello!`)
    .setDescription(`I'm ${client.user.tag}, a Moderation Bot!\n\nMy prefix is \`${prefix}\`! \nUse \`${prefix}help\` to see my commands!`)
    .setColor(`#FFFFFF`)
    .setFooter(`Coded by: Lexaro.`)
  return message.channel.send(embed);
}
})

// BOT STATUS & CONSOLE LOG

client.on("ready", () => {
  console.log('\x1b[31m%s\x1b[0m', '[WARNING] There is no Fontconfig Error. This is a bug, Ignore it!');
  console.log('\x1b[0m\x1b[32m%s\x1b[0m', '[COMMANDS] Commands Loaded!');
  console.log('\x1b[33m%s','[CLIENT] Connecting to the bot...')
  console.log('\x1b[32m%s\x1b[0m', '[CLIENT] Bot is Online!');
  client.user.setActivity(`+help || Kronos`)
})

client.login("OTY1NjE1NDY4Njc5NDA5NzE1.Yl1xfA.SGCt78a2NZXQcuh-jaLC-opInPc");

// Bot Coded By: Lexaro