module.exports.run = async (bot,message,args) => {

    message.channel.send(`
    **Los comandos de count son !count: para comenzar a contar. !5mc: para informar que faltan 5 minutos para la cuenta regresiva. !vrestart para reiniciar el bot de count por algun fallo "ejecutar hasta que salga del canal de voz"
    Los comandos de inicio son !start que es para los códigos: inicie después de 15 segundos después del final del conteo para personas con mucho tiempo en la pantalla de carga , Si necesita hacer REQ, primero debe detener el recolector con el comando !stopscrim en codigo, y puedes volver a iniciar el bot.
    No ejecute a !clear porque genera errores en el bot. Para ejecutar !clear primero debe detener el recolector con !stopscrim.
    Los Comandos del Canal de Mensajes son !1m o !1m-duos o !1m-squads para informar en el chat que falta un minuto para el scrim
    !5m o !5m-duos o !5m-squads para informar en el chat que faltan cinco minutos para el scrim
    !10m o !10m-duos o !10m-squads para informar en el chat que faltan diez minutos para el scrim
    !notes : comando para publicidad o algun cartel nesecitado para cofigurarlo utiliza !setnotes
	comando! auto-start inicia scrims automáticamente sin tener que poner ningún código pero puedes iniciarlos manualmente
	Pero para ahorrar tiempo ya he añadido que lo inicie automáticamente .
	para detener los scrims automáticos solo tienes que poner el codigo !auto-stop **`)
        
        
        }
        
        
        module.exports.help = {
            name: "help-scrims"
        }
