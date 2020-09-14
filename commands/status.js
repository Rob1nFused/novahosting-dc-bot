const Discord = require("discord.js");
const tcpp = require("tcp-ping");
const async = require('async');

module.exports.run = async (bot, message, args) => {

const loading = "<:blue_circle:754906297798885429>";
    var nodes = {
        1: "Node1.consulhosting.nl",
        2: "Node2.consulhosting.nl",
        5: "Vps.consulhosting.nl"
    }
    var sites = {
        3: "novahosting.nl",
        4: "panel.consulhosting.nl",
        6: "web01.consulhosting.nl"
    }
    var status = {
        1: loading,
        2: loading,
        3: loading,
        4: loading,
        5: loading,
        6: loading
    }
 
    function createembed() {
        var botIcon = bot.user.avatarURL;
        return embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("**Status | NovaHosting <:novahosting:753428865279328377>**")
            .setFooter("©️ NovaHosting", botIcon)
            .setThumbnail(botIcon)
            .addField("_Nodes_", "Node1:"+status[1]+"\nNode2:"+status[2]+"\nVPS1:"+status[5], true)
            .addField("_Sites_", "Site:"+status[3]+"\nPterodactyl:"+status[4]+"\nDirectadmin:"+status[6], true)
            .setTimestamp();
    }
 
 
    message.channel.send({
        embed: createembed()
    }).then(function(m) {
 
        status[1] = " <:green_circle:754904989373300746>";
 
        m.edit({
            embed: createembed()
        })
 
        async.forEachOf(nodes, (value, key, callback) =>{
 
            tcpp.ping({
                address: value,
                port: 8080,
                timeout: 300
            }, function(err, data) {
                if (data.max == undefined) {
                    status[key] = " <:red_circle:754906501147263007>";
                } else {
                    status[key] = " <:green_circle:754904989373300746>";
                }
                m.edit({
                    embed: createembed()
                })
 
            });
        });
        async.forEachOf(sites, (value, key, callback) => {
 
            tcpp.ping({
                address: value,
                port: 80,
                timeout: 300
            }, function(err, data) {
                if (data.max == undefined) {
                    status[key] = " <:red_circle:754906501147263007>";
                } else {
                    status[key] = " <:green_circle:754904989373300746>";
                }
                m.edit({
                    embed: createembed()
                })
 
            });
        });
 
 
    });
}

module.exports.help = {
    name: "status",
}