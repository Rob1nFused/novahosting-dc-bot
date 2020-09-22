const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {

    const server = bot.guilds.get('750126432872562788');
    const serverLeden = server.memberCount;
    const serverKanalen = '';
    const serverRollen = '';

    var serverinfoEmbed = new Discord.MessageEmbed()
	.setTitle("Server info | NovaHosting")
	.setColor("RANDOM")
	.setThumbnail(message.guild.iconURL)
	.addFields(
        {name: 'Naam', value: 'NovaHosting', inline: true},
        {name: 'ID', value: '750126432872562788', inline: true},
        {name: 'Eigenaar', value: 'Rob1nFused#9682', inline: true}
    )
    .addFields(
        {name: 'Leden', value: `${serverLeden}`, inline: true},
        {name: 'Kanalen', value: `${serverKanalen}`, inline: true},
        {name: 'Rollen', value: `${serverRollen}`, inline: true}
    );
	

}
module.exports.help = {
    name: "serverinfo",
}