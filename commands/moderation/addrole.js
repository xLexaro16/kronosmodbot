const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
  name: "addrole",
  aliases: ["role", "role"],
  category: "moderation",
  description: "Add role to any user",
run: async (bot, message, args) => {

        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("\```yml\nMODERATION: You need MANAGE_ROLES permission!\n\```");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("\```yml\nMODERATION: I do not have enough permissions!\n\```");
        
        if (!args[0]) return message.channel.send("\```yml\nMODERATION: Please mention a user!\n\```")

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.channel.send("\```yml\nMODERATION: Please enter a username!\n\```");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('\```yml\nMODERATION: Cannot add the role to that user!\n\```')

        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("\```yml\nMODERATION: Please enter a role!\n\```")

        if (!role) return message.channel.send("\```yml\nMODERATION: Could not find that role!\n\```")

        if (role.managed) return message.channel.send("\```yml\nMODERATION: Cannot add the role to that user!\n\```")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('\```yml\nMODERATION: Roles are currently higher than me!\n\```')

        if (rMember.roles.cache.has(role.id)) return message.channel.send("\```yml\nMODERATION: User already has the role!\n\```")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`Role has been added to ${rMember.user.username}`)
        message.channel.send(sembed)

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(rMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "addrole")
            .addField("**Added Role to**", rMember.user.username)
            .addField("**Role Added**", role.name)
            .addField("**Added By**", message.author.username)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

        let sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }
};
