const { Client, Message, MessageEmbed } = require('discord.js');
let ownerid = "906904392899395634";
let ownerid2 = "906904392899395634";


module.exports = {
    name: 'leaveserver',
    category: "owner",
    aliases: ['lvs'],
    description: 'bot can leave server by this command',
    useage: '',
    accessableby: "",
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        if (message.author.id === ownerid || ownerid2) {
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return message.channel.send(
                    new MessageEmbed()
                        .setColor("RED")
                        .setAuthor(message.author.tag)
                        .setDescription("**:x: You Dont Have The Permissions To Use This Command! - [ADMINISTRATOR]**")
                        .setFooter("Coded by: Lexaro")
                ).then((msg => {
                    msg.delete({ timeout: 10000 })
                }))
            }
        }

        const guildId = args[0];

        if (!guildId) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription("**Please Provide an Guild ID **")
                .setFooter("Coded By NarutoCodm And Neox")
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))

        const guild = client.guilds.cache.find((g) => g.id === guildId)

        if (!guild) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setAuthor(message.author.tag)
                .setDescription("** This Guild Not Found .. **")
                .setFooter("Coded by: NarutoCodm")
        ).then((msg => {
            msg.delete({ timeout: 10000 })
        }))
        let leaved = await guild.leave()
        if (leaved) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor("RED")
                    .setAuthor(message.author.tag)
                    .setDescription(`Successfully left guild: **${guild.name}**`)
                    .setFooter("Coded by: NArutoCodmANd Neox")
            )
        } else {
            message.channel.send('i cant do....')
        }

    }
}