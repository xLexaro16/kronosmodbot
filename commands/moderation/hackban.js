const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");

module.exports = {
  name: "hackban",
  description: "asdf",
  category: "moderation",
  run: async(bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") && !ownerID.includes(message.author.id)) return;
        
        const target = args[0];
        if (isNaN(target)) return message.reply("\```yml\nMODERATION: Please specify a user ID!\n\```");

        const reason   = args.splice(1, args.length).join(' ');

            try {
                message.guild.members.ban(target, {reason: reason.length < 1 ? 'No reason supplied.': reason});
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("\```yml\nMODERATION: User got banned without a DM notification!\n\```");
                await message.channel.send(embed2);                
                const channel  = db.fetch(`modlog_${message.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("RED")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
            
            } catch (error) { console.log(error)}
    }
}