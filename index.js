const { channel } = require("diagnostics_channel")
const Discord = require("discord.js")
require('dotenv').config()


const intents = new Discord.Intents(32767)

const client = new Discord.Client({ intents,    partials: ['MESSAGE', 'REACTION'] })

client.once('ready', ()=>{
    console.log(`Sesion iniciada como ${client.user.tag}`)
})


client.on('guildMemberAdd', member=>{
    const channel = client.channels.cache.get('875694312426463236')
    const embedDatos = new Discord.MessageEmbed() 
    .setColor('#FF5733')
	.setTitle(`Bienvenido ${member.user.tag}`)
	.setURL('https://es.forum.grepolis.com/index.php')
	.setAuthor(client.user.tag)
	.setDescription('¡Te damos la bienvenida al discord oficial de Grepolis España!')
	.setThumbnail(`${client.user.displayAvatarURL()}`)
	.addFields(
        { name: '\u200B', value: '\u200B' },
		{ name: '¡Valida tu cuenta para empezar!', value: 'Para empezar tu aventura en el servidor tendrás que validar tu cuenta siguiendo unas sencillas instrucciones.' },
        { name: '\u200B', value: '\u200B' },
		{ name: 'RECUERDA', value: 'Nunca pediremos acceso a datos privados como tu contraseña o tu correo electrónico. ', inline: true },
        { name: '\u200B', value: '\u200B' },
		{ name: '¡Valídate!', value: 'Escribe !registro cuando quieras empezar', inline: true },
	)
	.setTimestamp()
	.setFooter('Este mensaje está generado automáticamente por un bot');

member.roles.add("876654765671600138")
channel.send({ embeds: [embedDatos] });

})


function mensaje(message){
    const preguntas = [
        '¿Cuál es tu servidor? (es)',
        '¿Cuál es tu nombre de usuario en el servidor?',
        '¿Qué número de mundo juegas?'
        ]
    let contador = 0    
    
    const filter = m => m.author.id == message.author.id;
    const collector = message.channel.createMessageCollector({filter, max: preguntas.length, time:15000});

    message.channel.send(preguntas[contador++])
    collector.on('collect', m=>{
        if(contador<preguntas.length){
            m.channel.send(preguntas[contador++])
        }else{
            m.channel.send("Gracias por responder las preguntas")
            collector.stop()
        }
    })

    collector.on('end', (collected) =>{
        console.log(`En total se ha escrito ${collected.size} mensajes.`)
        let counter = 0
        collected.forEach((value)=> {
            console.log(preguntas[counter++],value.content)
        })

    })

}

client.on('messageCreate', async (message) =>{
        let prefix = '!'
    
        if(message.channel.type === 'dm') return;
        if(message.author.bot) return;
        if(!message.content.startsWith(prefix)) return;
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase()
    
        if(command === 'registro'){
            /*const filter = m => m.author.id === message.author.id;
            const collector = message.channel.createMessageCollector({ filter, time: 15000 });
            
            collector.on('collect', m => {
                console.log(`Collected ${m.content}`);
            });
            
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });*/
            mensaje(message)
        }

})





client.login(process.env.TOKEN)