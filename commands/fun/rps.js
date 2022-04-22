const discord = require('discord.js')
const colors = require('./../../colors.json')

module.exports = {
	name: "rps",
	category: "fun",
  aliases: ["rockpaperscissor", "rock-paper-scissor"],
	description: "play a game of rock, paper and scissors",
	run: async(client, message, args) => {
		let embed = new discord.MessageEmbed()
		.setTitle("RPS GAME")
		.setDescription("React to play!")
		.setTimestamp()
    .setFooter("Bot made By NarutoCodm | Prefix:!")
		let msg = await message.channel.send(embed)
		await msg.react("🗻")
		await msg.react("✂")
		await msg.react("📰")

		const filter = (reaction, user) => {
            return ['🗻', '✂', '📰'].includes(reaction.emoji.name) && user.id === message.author.id;
        }

        const choices = ['🗻', '✂', '📰']
        const me = choices[Math.floor(Math.random() * choices.length)]
        msg.awaitReactions(filter, {max:1, time: 60000, error: ["time"]}).then(
        	async(collected) => {
        		const reaction = collected.first()
        		let result = new discord.MessageEmbed()
        		.setTitle("RESULT")
        		.addField("Your choice", `${reaction.emoji.name}`)
        		.addField("My choice", `${me}`)
			await msg.edit(result)
        		if ((me === "🗻" && reaction.emoji.name === "✂") ||
                (me === "📰" && reaction.emoji.name === "🗻") ||
                (me === "✂" && reaction.emoji.name === "📰")) {
                    message.reply(":x: You lost!");
            } else if (me === reaction.emoji.name) {
                return message.reply(":negative_squared_cross_mark: It's a tie!");
            } else {
                return message.reply(":tada: You won!");
            }
        })
        .catch(collected => {
                message.reply(':x: Process has been cancelled since you did not respond in time!');
            })
}
}

