const Discord = require ('discord.js');
const Solos = "😉";
const Duos = "😃";
const Squads = "😋";

module.exports.run = async (bot, message, args) => {

	
	let general = "536028903458996225";
	let commands = "536028903458996225";
	let voiceChannelID = "536028903458996228";
    let voice_channel = message.guild.channels.get(voiceChannelID);
	let members = message.guild.channels.get(voiceChannelID).members.size;

    let msg = await message.channel.send("Votacion De Modalidad! 😉 Solos , 😃 Duos , 😋 Squads . Finaliza En 2 Minutos ");

    await msg.react(Solos);
    await msg.react(Duos);
    await msg.react(Squads);

    const reactions = await msg.awaitReactions(reaction => reaction.emoji.name === Solos || reaction.emoji.name === Duos || reaction.emoji.name === Squads, {time:5000});
    let Sols = reactions.get(Solos) ? reactions.get(Solos).count -1 : 0
    let Dus = reactions.get(Duos) ? reactions.get(Duos).count -1 : 0
	let Sqds = reactions.get(Squads) ? reactions.get(Squads).count -1 : 0
    if (Sols > Dus > Sqds ) {
      let embedr = new Discord.RichEmbed()
          .setTitle("Las Scrims Seran En Solitario!")
          .setDescription("Resultados :")
          .addField("Solos!" , `${Solos}: ${Sols}`)
          .addField("Duos!" , `${Duos}: ${Dus}`)
		  .addField("Squads!" , `${Squads}: ${Sqds}`)
		  .setFooter(`Conteo Renombrado A @Solos [${members}]`)	
    message.channel.send({embed: embedr});
	voice_channel.setName('Conteo (NA-East) @Solos')
   .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
   .catch(console.error);
  } else if (Dus > Sols > Sqds){
    let embeds = new Discord.RichEmbed()
        .setTitle("Las Scrims Seran En Duos!")
          .setDescription("Resultados :")
          .addField("Solos!" , `${Solos}: ${Sols}`)
          .addField("Duos!" , `${Duos}: ${Dus}`)
		  .addField("Squads!" , `${Squads}: ${Sqds}`)  
		  .setFooter(`Conteo Renombrado A @Duos [${members}]`)		
    message.channel.send({embed: embeds});
	voice_channel.setName('Conteo (NA-East) @Duos')
   .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
   .catch(console.error);
	} else if (Sqds > Sols > Dus){
    let embeds = new Discord.RichEmbed()
        .setTitle("Las Scrims Seran En Squads!")
          .setDescription("Resultados :")
          .addField("Solos!" , `${Solos}: ${Sols}`)
          .addField("Duos!" , `${Duos}: ${Dus}`)
		  .addField("Squads!" , `${Squads}: ${Sqds}`) 
          .setFooter(`Conteo Renombrado A @Squads [${members}]`)			  
    message.channel.send({embed: embeds});
	voice_channel.setName('Conteo (NA-East) @Squads')
   .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
   .catch(console.error);
	}else {
	let embedsz = new Discord.RichEmbed()
		  .setTitle("Empate! Las scrims se iniciaran hasta que se decida el modo de juego")
		  .setDescription("Resultados :")
          .addField("Solos!" , `${Solos}: ${Sols}`)
          .addField("Duos!" , `${Duos}: ${Dus}`)
		  .addField("Squads!" , `${Squads}: ${Sqds}`)
		  .addField("Se Realizara De Nuevo La Votacion Automaticamente","NO TE OLVIDES VOTAR @here")
	message.channel.send({embed: embedsz});
	bot.guilds.get(message.guild.id).channels.get(general).send("!vta").catch((err) => {
            console.log(err);
    });
	}
    msg.delete(2000)
    

}

module.exports.help = {
    name: "vta"
}