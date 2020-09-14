const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    const categoryID = "754915893166997635";

    if (message.channel.parentID == categoryID) {
        var deletedChannel = message.channel;
        message.channel.delete();
        

        var logChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
        var embedTicketCreated = new Discord.MessageEmbed()
        .setTitle(`${deletedChannel} | Ticket <:ticket:754922284749422683>`)
        .setColor("RANDOM")
        .setDescription("Ticket status: Gesloten");

        logChannel.send(embedTicketCreated);
    } else {
        return;
    }

}
module.exports.help = {
    name: "close",
}