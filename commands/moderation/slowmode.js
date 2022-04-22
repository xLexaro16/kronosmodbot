module.exports = {
  name: "slowmode",
  category: "moderation",
  description: "Lets you set slowmode on the channel.",
  args: true,
  usage: "<time>",
  run: (client, message, args) => {
    const amount = parseInt(args[0]);
    if (message.member.hasPermission("MANAGE_CHANNEL"))
      if (isNaN(amount))
        return message.channel.send("\```yml\nMODERATION: Please specify a regular number!\n\```");
    if (args[0] === amount + "s") {
      message.channel.setRateLimitPerUser(amount);
      if (amount > 1) {
        message.channel.send(":white_check_mark: Slowmode is now " + amount + " seconds!");
        return;
      } else {
        message.channel.send(":white_check_mark: Slowmode is now " + amount + " second!");
        return;
      }
    }
    if (args[0] === amount + "min") {
      message.channel.setRateLimitPerUser(amount * 60);
      if (amount > 1) {
        message.channel.send(":white_check_mark: Slowmode is now " + amount + " minutes!");
        return;
      } else {
        message.channel.send(":white_check_mark: Slowmode is now " + amount + " minute!");

        return;
      }
    }
    if (args[0] === amount + "h") {
      message.channel.setRateLimitPerUser(amount * 60 * 60);
      if (amount > 1) {
        message.channel.send(":white_check_mark: Slowmode is now " + amount + " hours!");
        return;
      } else {
        message.channel.send(":white_check_mark: Slowmode is now " + amount + " hour!");
        return;
      }
    } else {
      message.channel.send(
        "\```yml\nMODERATION: You can only set:\n[number]s (seconds)\n[number]m (minutes)\n[number]h (hours)\n\```"
      );
    }
  }
};
