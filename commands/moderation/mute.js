const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["mutes", "muted"],
  category: "moderation",
  description: "mute @user",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("\```yml\nMODERATION: You need MANAGE_ROLES permission!\n\```");
    }
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("\```yml\nMODERATION: I do not have enough permissions!\n\```");
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("\```yml\nMODERATION: Please mention the member for mute!\n\```");
    }
    if (user.id === message.author.id) {
      return message.channel.send("\```yml\nMODERATION: I cannot mute you!\n\```");
    }
    let reason = args.slice(1).join("");

    if (!reason) {
      return message.channel.send("\```yml\nMODERATION: Reason is required!\n\```");
    }

    const vrole = user.roles.cache

    let muterole = message.guild.roles.cache.find(x => x.name === "muted");

    if (!muterole) {
      return message.channel.send("\```yml\nMODERATION: The role muted is not setup yet. Create a role called 'muted'!\n\```");
    }
    
    await user.roles.remove(vrole);
    await user.roles.add(muterole);

    await message.channel.send(
      `you muted ${message.mentions.users.first().username} for ${reason}`
    );

    user.send(`:warning: You are muted in ${message.guild} for __${reason}__!`
    );
  }
};
