const Discord = require('discord.js');
const fs = require('fs');
const settings = require('./../settings.json');
const owner = settings.owner;


module.exports.run = async (bot, message, args) => {

    let voice = "534890071606689792";
    let codes = "534173973953642496";
    let general = "534190682332594187";
	

    console.log("Activating Auto Comamand");

    let raw = fs.readFileSync('./roles.json');
    let allowedRoles = JSON.parse(raw);

    let validation = function(serverRoles, userRoles){
     let val = false;
     serverRoles.forEach((role) => {
         userRoles.forEach((usr) => {
                if (role == usr){
                  val = true;
                }
            });
        });
        return val;
    }


    let intro = new Discord.RichEmbed()
        .setTitle("Las Scrims Inician Automaticamente Cada Media Hora, 24/7")
        .setColor("#00cc00");

        bot.guilds.get(message.guild.id).channels.get(general).send({embed: intro}).catch((err) => {
            console.log(err);
        });

        let autoScrims = setInterval(() => {
            let time = new Date();
            let min = time.getMinutes();
            let embed = new Discord.RichEmbed()

            if (min === 50 || min === 20){
		embed.setTitle("Siguiente Scrim En 10 Minutos **Unanse al Conteo!!!**")
		embed.setColor("#00cc00");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            }else if (min === 55 || min === 25){
                embed.setTitle("Siguiente Scrim En 5 Minutos **Unanse al Conteo!!!**")
		embed.setColor("#EDFF21");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            }else if (min === 59 || min === 29){
                embed.setTitle("Siguiente Scrim En 1 Minuto **Por Favor estar atento al Conteo y cargar contenido!**")
				embed.setColor("#F80000");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });
            
            }else if (min === 00 || min === 30){
                embed.setTitle("La Scrim Ya Empezo, Buena Suerte!! __**Recuerden Poner Sus Ultimos 3 digitos En #código**__")
		embed.setColor("#00cc00");
                bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                    console.log(err);
                });

                bot.guilds.get(message.guild.id).channels.get(codes).send("!count").catch((err) => {
                    console.log(err);
                });

                bot.guilds.get(message.guild.id).channels.get(codes).send("!start").catch((err) => {
                    console.log(err);
                });

            }
				
            const filter = m => !m.author.bot;
            const collect = bot.guilds.get(message.guild.id).channels.get(general)
                .createMessageCollector(filter, {time: 60000});

            collect.on('collect', m => {
                if (m.content === "!auto-stop" || m.content === "!auto-start"){
                    if(validation(allowedRoles.roles, m.member.roles.array()) || m.member.id === owner){
                        clearInterval(autoScrims);
                        collect.stop();
                        bot.guilds.get(message.guild.id).channels.get(general).send("Auto Scrims Detenidas").catch((err) => {
                            console.log(err);
                        });
                    }
                }
            });

        }, 60000);
    
}

module.exports.help = {
    name: "auto-start"
}
