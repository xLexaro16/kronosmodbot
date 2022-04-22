const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
name: "kick",
category: "moderation",
description: "kick a user",
cooldown: 5,
userPerms: ["KICK_MEMBERS"],
clientPerms: ["KICK_MEMBERS"],
run: async(client, message, args) => {  
const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const reason = args.slice(1).join(" ")
          if (!args[0]) return message.channel.send("\```yml\nMODERATION: Please specify a user to kick!\n\```")
        if (!mentionedMember) return message.channel.send("\```yml\nMODERATION: Unknow Member!\n\```")
        if (mentionedMember.id === message.author.id) return message.channel.send("\```yml\nMODERATION: You can't kick yourself!\n\```")
        if (mentionedMember.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send("\```yml\nMODERATION: You can't kick that user!\n\```")
        }
        if (mentionedMember.kickable) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(mentionedMember.user.displayAvatarURL({dynamic: true}))
            .setColor(`GREEN`)
            .setDescription(`
**Member:** ${mentionedMember.user.username} - (${mentionedMember.user.id})
**Reason:** ${reason || "None"}
            `)
        message.channel.send(embed)
        mentionedMember.kick()
        } else {
            return message.channel.send("\```yml\nMODERATION: I can't kick the user! Make sure i have the permission KICK_MEMBERS and my role is above of that user's roles!\n\```")
        }
        return undefined
    }
}
