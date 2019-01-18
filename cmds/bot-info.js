const Discord = require("discord.js");
const help = require('./help-scrim')
module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("**Informacion Del Bot**")
    .addField("Nombre Del Bot", bot.user.username)
    .addField("Los comandos de count son :", "!count: para comenzar a contar. !5mc: para informar que faltan 5 minutos para la cuenta regresiva. !vrestart para reiniciar el bot de count por algun fallo **ejecutar hasta que salga del canal de voz**")
    .addField("Los comandos de inicio son :","!start que es para los códigos: inicie después de 15 segundos después del terminar el conteo para personas con mucho tiempo en la pantalla de carga , Si necesita hacer REQ Esta El !start-req ,para detener el recolector manualmnete con el comando !stop en codigo o codigo-req, y listo . pd: se detiene automatico luego de unos minutos")
    .addField("Los Comandos del Canal de Mensajes De La Scrim son :",`!1m o !1m-duos o !1m-squads para informar en el chat que falta un minuto para el scrim
    !5m o !5m-duos o !5m-squads para informar en el chat que faltan cinco minutos para el scrim
    !10m o !10m-duos o !10m-squads para informar en el chat que faltan diez minutos para el scrim`)
    .addField("Commando De Notas :","!notes es para publicidad o algun cartel nesecitado para cofigurarlo utiliza !setnotes")
    .addField("Comando para iniciar Scrims automaticamente 24/7 ;",`!auto-start inicia scrims automáticamente sin tener que poner ningún código pero puedes iniciarlos manualmente
	Pero para ahorrar tiempo ya he añadido que lo inicie automáticamente .
	para detener los scrims automáticos solo tienes que poner el codigo !auto-stop`)
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Creado En", bot.user.createdAt)
    .setFooter("Creado Por !Fabian Araya (Xccursed_CR)", "https://i.imgur.com/ADnSULk.jpg")

    message.channel.send(botembed);
    
}

module.exports.help = {
  name:"bot-info"
}