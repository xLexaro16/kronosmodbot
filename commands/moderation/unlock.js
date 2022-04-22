const Discord = module.require("discord.js");
const colors = require('./../../colors.json')

module.exports = {
   name: "unlock",
   category: "moderation",
   description: "Unlocks a Channel",
    usage: "unlock <channel>",
  args: true,
    permissions: "MANAGE_CHANNELS",
   run: async(client, message, args) => {
   if (!message.member.hasPermission('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("\```yml\nMODERATION: You need MANAGE_SERVER and MANAGE_CHANNELS permissions!\n\```")
   }
   message.channel.overwritePermissions([
     {
        id: message.guild.id,
        null : ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔓 ${message.channel}  has been Unlocked!`)
   .setColor(colors.uptime)
   await message.channel.send(embed);
   message.delete();
}
}
