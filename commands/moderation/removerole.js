const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "removerole",
  aliases: ["rrole", "rrole"],
  category: "moderation",
  description: "Remove role from any user",
  run: async (client, message, args) => {
    
    let target = message.mentions.members.first();
    
    if(!target) return message.reply(`\```yml\nMODERATION: Unknow user!\n\````)
    
    let rrole = message.mentions.roles.first();
    
    if(!rrole) return message.reply(`\```yml\nMODERATION: Unknow role!\n\````)
    
    let ticon = target.user.avatarURL({ dynamic: true, size: 2048 });
    let aicon = message.author.avatarURL({ dynamic: true, size: 2048 });
    
      const embed = new MessageEmbed()
      .setAuthor(target.user.username, ticon)
      .setThumbnail(target.user.displayAvatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setDescription(`${rrole} role removed from ${target}`)
      .setFooter(`Role added by ${message.author.username}`, aicon)
      .setTimestamp()
      
      await message.channel.send(embed)
      
      target.roles.remove(rrole)
    
  }
}
