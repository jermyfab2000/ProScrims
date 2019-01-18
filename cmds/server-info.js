const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Informacion Del Servidor")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Nombre Del Server", message.guild.name)
    .addField("Creado En", message.guild.createdAt)
    .addField("Te uniste", message.member.joinedAt)
    .addField("Miembros Totales", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"server-info"
}