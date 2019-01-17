const Discord = require ('discord.js');
const Listing = require ('./../modules/Listing');
const fs = require('fs');
const settings = require('./../settings.json');
const owner = settings.owner;

module.exports.run = async (bot, message, args) => {
   let roles = message.guild.roles;
   let scrimmers = message.guild.roles.find( r => r.name === "Player");
   let snipeChannel = message.channel;
   const filter = m => !m.author.bot;
   let game = new Listing();

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

   let editLast3 = null;

   let startMessage = new Discord.RichEmbed()
        .setAuthor("PRO SCRIMS", "https://i.imgur.com/hxHm6ZV.jpg")
        .setThumbnail("https://i.imgur.com/eR5D1t0.png")
        .setURL("https://www.twitch.tv/becc4")
        .setDescription(`__**Scrims Multiplataforma**__
Servidor: **BRAZIL**
Instrucciones: 
-Carga contenido. 
-Espera en el canal de conteo. 
-Al escuchar el conteo dale listo al __**GO**__. 
-En caso de ps4 darle listo con el mouse.
-Ingresa los últimos tres dígitos de tu servidor en __**#código.**__`)
        .setImage("https://i.imgur.com/IeIuzix.png")
        .setColor("#8600b3")
        .addField("Hosted by" , message.author)
        .setFooter("Dev By !Fabian Araya (Xccursed_CR)", "https://i.imgur.com/ADnSULk.jpg")
        
    
    message.channel.send({embed: startMessage});    
    
    let time = 30;
    let editTime = "";

    let timeEmbed = new Discord.RichEmbed()
        .setTitle("**Siguiente Partida En...**")
        .setDescription(time + "Minutos")
        .setColor("#8600b3");
        

    setTimeout(async () => {
        editTime = await message.channel.send({embed: timeEmbed}).catch( (err) => {
            console.log("No puedes editar el Codigo");
        });
    }, 10);    

        let timeInterval = setInterval(()=> {
        if (time >= 2){
            time -= 1;
            timeEmbed.setDescription(time + " Minutos");
        }else if (time === 1){
            time -= 1;
            timeEmbed.setDescription(time + " Minutos");
            clearInterval(timeInterval);
        }
        editTime.edit({embed: timeEmbed}).catch((err) => {
            console.log("Cant edit timer, clearing interval");
            clearInterval(timeInterval);
        });
    },60000);

    let last3 = new Discord.RichEmbed()
        .setTitle ("**SERVIDORES**")
        .setColor ("#8600b3")

    setTimeout(async () => {
        editLast3= await message.channel.send({embed: last3});
    }, 10);
    
    const collector =snipeChannel.createMessageCollector(filter, {time: 180000});
	snipeChannel.overwritePermissions(
        scrimmers,
        { "SEND_MESSAGES": true}
    )

    collector.on('collect', m => {

        console.log(`Collected ${m.content} | ${m.author}`);       
        
        if (validation(allowedRoles.roles,m.member.roles.array()) || m.member.id === owner){
            if (m.content === "!start" || m.content === "!stop"){
                collector.stop();
                console.log("Collector Stoped");
                return;
            }
        }   
        if (game.data.length ===0 && m.content.length === 3){
            game.addID(m.content.toUpperCase(), m.author);
        }else if (m.content.length === 3){
            if (game.userPresent(m.author)){
                game.deleteUserEntry(m.author);
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author);
                }else {
                     game.addID(m.content.toUpperCase(), m.author);
                }
            } else {
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author);
                }else {
                    game.addID(m.content.toUpperCase(), m.author);
                }
            }
        }

    game.sort();

    let str = "";
    last3 = new Discord.RichEmbed()
        .setTitle("**SERVIDORES**")
        .setColor("#8600b3")

    for (var i =0; i < game.data.length; i++){
        str = "";
        for (var j = 0; j < game.data[i].users.length ; j++){
            str += game.data[i].users[j] + "\n";
        }
        last3.addField(`${game.data[i].id.toUpperCase()} - ${game.data[i].users.length} Jugadores` , str, true);
    }    

    editLast3.edit({embed: last3}).catch((err) => {
        console.log("error no puedes editar");
    });

    if (m.deletable){
        m.delete().catch((err) => {
            console.log("No puedes Borrar");
            console.log(err);
        });
    }

    });

    collector.on('end', collected => {

        console.log(`Collected ${collected.size} items`);
        let endMessage = new Discord.RichEmbed()
			.setAuthor("Pro Scrims", "https://i.imgur.com/hxHm6ZV.jpg")
			.setColor("0x00AE86")
            .setDescription("**No Se Aceptan Mas Codigos En Este Punto Buena Suerte!**")
            .setFooter("Chat Bloqueado" , "https://i.imgur.com/iGo7XPH.png")
		message.channel.send({embed: endMessage});
		snipeChannel.overwritePermissions(
            scrimmers,
            { "SEND_MESSAGES": false}
        );
    });
}






module.exports.help = {
    name: "start"
}
