const { GuildMember } = require("discord.js");
const { info } = require("log-symbols");

module.exports = bot => {

    const welcomeChannelID = '755096086867214380';
    const informatieChannelID = '750127937931706478';
    const bezoekerRoleID = '755098836615299222';

    bot.on('guildMemberAdd', (member) => {

        const WelcomeChannel = member.guild.channels.cache.get(welcomeChannelID);
        const informatieChannel = member.guild.channels.cache.get(informatieChannelID).toString();

        var welcomeEmbed = new Discord.MessageEmbed()
    	.setTitle(`Welkom <@${member.id}>`)
    	.setColor("RANDOM")
		.setDescription(`Welkom in de NovaHosting Discord server. Lees even goed ${informatieChannel} door voor onze regels en algemene informatie!`)
        .setTimestamp();
        
        channel.send(welcomeEmbed);
        member.roles.set(bezoekerRoleID);

    }); 

}