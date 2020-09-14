const Discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

	if(err) console.log(err);

	var jsFiles = files.filter(f => f.split(".").pop() === "js");

	if(jsFiles.length <=0) {
		console.log("Er zijn geen files gevonden!");
		return;
	}

	jsFiles.forEach((f,i) => {

		var fileGet = require(`./commands/${f}`);
		console.log(`De file ${f} is geladen!`)

		bot.commands.set(fileGet.help.name, fileGet);

	});

});


bot.on("ready", async () => {
	console.log(`${bot.user.username} is online!`);
	bot.user.setActivity("NovaHosting.nl", { type: "WATCHING" });
});

bot.on("guildMemberAdd", async member => {
	const welcomeChannel = member.guild.channels.cache.get('755096086867214380');
	const informatieChannel = member.guild.channels.cache.get('750127937931706478').name;
	const welcomeRole = member.guild.roles.cache.get('755098836615299222');
	if(!welcomeChannel) return;

	var welcomeEmbed = new Discord.MessageEmbed()
    	.setTitle(`Welkom ${member}`)
    	.setColor("RANDOM")
		.setDescription(`Welkom in de NovaHosting Discord server. Lees even goed ${informatieChannel} door voor onze regels en algemene informatie!`)
		.setTimestamp();

		channel.send(welcomeEmbed)
		member.guild.addrole(welcomeRole);


});

bot.on("message", async message => {

	if (message.author.bot) return;

	if (message.channel.type == "dm") return;


	var prefix = botConfig.prefix;

	var messageArray = message.content.split(" ");

	var command = messageArray[0];

	var args = messageArray.slice(1);

	if (!command.startsWith("!")) return;


	var commands = bot.commands.get(command.slice(prefix.length));

	if(command) commands.run(bot, message, args);
});
bot.login(process.env.token);