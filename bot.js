const Discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const welcome = require('./events/welcome');

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
	welcome(bot);
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