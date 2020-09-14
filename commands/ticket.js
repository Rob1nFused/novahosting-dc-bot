const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    const categoryID = "754915893166997635";

    var userName = message.author.username;
    var ticketID = message.author.discriminator;
    var cmdChannel = message.channel.id === '750444909667942540';
    ticketExist = false;

    if (!cmdChannel) {
        message.delete();
        message.reply(`U kunt dit command alleen uitvoeren in ${cmdChannel}`).then(message => {message.delete({timeout: 10000})});
        return false;

    }

    message.guild.channels.cache.forEach(channel => {

        if(channel.name == userName.toLowerCase() + "-" + ticketID) {

            message.reply(`Er staat al een lopende ticket op uw naam.`);
            ticketExist = true;

            return;
        }
    });

    if(ticketExist) return;

    message.guild.channels.create(userName.toLowerCase() + "-" + ticketID, {type: 'text'}).then(
        (createdChannel) => {
            createdChannel.setParent(categoryID).then(
                (settedParent) => {

                    settedParent.updateOverwrite(message.guild.roles.cache.find(x => x.name === '@everyone'), {
                        SEND_MESSAGES: false,
                        VIEW_CHANNEL: false
                    });

                    settedParent.updateOverwrite(message.author.id, {
                        CREATE_INSTANT_INVITE: false,
                        READ_MESSAGES: true,
                        SEND_MESSAGES: true,
                        ATTACH_FILES: true,
                        CONNECT: true,
                        ADD_REACTIONS: true,
                        VIEW_CHANNEL: true,
                        READ_MESSAGE_HISTORY: true
                    });

                    var embedTicket = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username} | Ticket <:ticket:754922284749422683>`)
                    .setColor("RANDOM")
                    .setDescription("Dank u om ons te bereiken voor support, Stel hier uw vraag!")
                    .setTimestamp();

                    settedParent.send(embedTicket);

                    message.reply(`Zie ${settedParent} voor uw ticket!`);

                    var logChannel = message.member.guild.channels.cache.find(channel => channel.name === "logs");
                    var embedTicketCreated = new Discord.MessageEmbed()
                    .setTitle(`${settedParent.name} | Ticket <:ticket:754922284749422683>`)
                    .setColor("RANDOM")
                    .setDescription("Ticket status: aangemaakt");

                    logChannel.send(embedTicketCreated);


                }
            ).catch(err => {
                message.reply("Sorry, er is iets misgegaan, probeer het opnieuw!");
            });

            

        }
    ).catch(err => {
        message.reply("Sorry, er is iets misgegaan, probeer het opnieuw!");
    });

}
module.exports.help = {
    name: "ticket",
}