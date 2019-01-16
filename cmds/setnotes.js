const Discord = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot,message,args) => {
    
    let filter = m => !m.author.bot;
    let snipeChannel = message.channel;
    const collector = snipeChannel.createMessageCollector(filter,{max: 200, maxMatches: 200, time: 180000});

    let menu = new Discord.RichEmbed()
        .setTitle("Mensaje Pesonalizado")
        .addField("A +","Seleccionar Titulo")
        .addField("B +","Seleccionar Descripcion")
        .addField("C +","Seleccionar Author")
        .addField("D +","Agregar Linea")
        .addField("E +","Agregar Linea")
        .addField("F +", "selecionar color")
        .addField("G +","Seleccionar Pie De Pagina")
        .addField("!listo", "Para Guardar")
        .setColor("#330033");
    
        message.channel.send({embed: menu});

    let notes = new Discord.RichEmbed()
    let d1 = "Olvidaste la D para el campo principal";
    let d2 = "Olvidaste el D2 para el segundo campo."

    collector.on('collect', m => {
        if (m.content === "!listo"){
            collector.stop();
            return;
        }else if (m.content.substring(0,1).toUpperCase() === "A") {
            notes.setTitle(m.content.substring(2));

        }
        else if (m.content.substring(0,1).toUpperCase() === "B") {
            notes.setDescription(m.content.substring(2));

        }
        else if (m.content.substring(0,1).toUpperCase() === "C") {
            notes.setAuthor(m.content.substring(2));

        }
        else if (m.content.substring(0,1).toUpperCase() === "D") {
            d1 = m.content.substring(2);

        }else if (m.content.substring(0,1).toUpperCase() === "E"){
            console.log("Works");
            d2 = m.content.substring(2);
            notes.addField(d1,d2);
        }else if (m.content.substring(0,1).toUpperCase() === "F") {
            notes.setColor(m.content.substring(2));

        }else if (m.content.substring(0,1).toUpperCase() === "G") {
            notes.setFooter(m.content.substring(2));

        }



    });

    collector.on('end', collected => {
        message.channel.send({embed: notes})

        console.log(notes);

        let notes_raw = JSON.stringify(notes);
        fs.writeFileSync('./note.json', notes_raw);
    });
}

module.exports.help = {
    name: "setnotes"
}