const Discord = require("discord.js");
const moment = require('moment');


module.exports.run = async (bot, message, args) => {

    const serverLeden = message.guild.memberCount;
    const serverKanalen = message.guild.channels.cache;
    const serverRollen = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());

    var serverinfoEmbed = new Discord.MessageEmbed()
	.setTitle("Server info | NovaHosting")
	.setColor("RANDOM")
	.setThumbnail(message.guild.iconURL({ dynamic: true}))
	.addFields(
        {name: 'Naam', value: 'NovaHosting', inline: true},
        {name: 'ID', value: '750126432872562788', inline: true},
        {name: 'Eigenaar', value: 'Rob1nFused#9682', inline: true}
    )
    .addFields(
        {name: 'Leden', value: `${serverLeden}`, inline: true},
        {name: 'Kanalen', value: `${serverKanalen.size}`, inline: true},
        {name: 'Rollen', value: `${serverRollen.length}`, inline: true}
    )
    .addField({name: 'Creatie datum', value: `${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`})

    message.channel.send(serverinfoEmbed);
	

}
module.exports.help = {
    name: "serverinfo",
}