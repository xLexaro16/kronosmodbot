const discord = require("discord.js");

module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>",
  run: async (client, message, args) => {
    
    const target = message.mentions.members.first()
    
    const reason = args.slice(1).join(" ")
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("\```yml\nMODERATION: You need BAN_MEMBERS permission!\n\```")
    
    if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("\```yml\nMODERATION: I do not have enough permissions!\n\````")
    
    if(!args[0]) return message.reply("\```yml\nMODERATION: Please mention a user!\n\```")
    
    if(!target) return message.reply("\```yml\nMODERATION: Unknow member!\n\```")
    
    if(target.roles.highest.position >= message.member.roles.highest.position || message.author.id !== message.guild.owner.id) {
      return message.reply("\```yml\nMODERATION: That user cannot be banned! Make sure that his roles are under my role!\n\```")
    }
    
    if(target.id === message.author.id) return message.reply("\```yml\nMODERATION: I can't ban you!\n\```")
    
    if(target.bannable) {
      let embed = new discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`Banned \`${target}\` for \`${reason || "No Reason Provided"}\``)
      
      message.channel.send(embed)
      
      target.ban()
      
      message.delete()
      
    } else {
      return message.reply("\```yml\nMODERATION: I cannot ban the user! Make sure my role is above of the user's roles!\n\```")
    }
    return undefined
  }
};