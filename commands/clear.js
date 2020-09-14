const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("U heeft geen toegang tot dit command.").then(message => {
        message.delete({timeout: 10000})
    });
    if (!args[0]) return message.reply("Geef het aantal op dat verwijderd moet worden. usage: !clear <aantal>").then(message => {
        message.delete({timeout: 10000})
    });
    if (Number.isInteger(parseInt(args[0]))) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount).then(message => {

            if(args[0] === 0) {

                message.reply(`Sorry, ik kan geen 0 berichten verwijderen.`)
                message.delete({timeout: 10000})
                return;

            } else if(args[0] === 1) {

                message.reply(`Er is ${args[0]} bericht verwijderd.`)
                message.delete({timeout: 10000})
                return;

            }else if(args[0] >1){
                
            message.reply(`Er zijn ${args[0]} berichten verwijderd.`)
            message.delete({timeout: 10000})

            }
        });

    } else {
        return message.reply("Geef een getal op.").then(message => {
            message.delete({timeout: 10000})
        });
    }

}
module.exports.help = {
    name: "clear",
}