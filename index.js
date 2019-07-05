/*** Bot discord AutoNickName ***/

//Creation du bot
const Discord = require('discord.js');
const {RichEmbed} = require('discord.js');
const AutoNickName = new Discord.Client();

AutoNickName.login(process.env.TOKEN);

AutoNickName.on("ready", () => {
    console.log("AutoNickName is connected");
});

//Code
AutoNickName.on("message", message => {

    if(message.author.bot) return; //Ignore les bots
    
    if(message.channel.name.indexOf("les-copains-dabord") >= 0) {

        if(message.author.id === message.guild.ownerID) return;

        let NicknameMute = message.guild.roles.find(nickName => nickName.name === 'NicknameMute');
        if(!NicknameMute) return;
        NicknameMute = NicknameMute.id;

        const channelLog = message.guild.channels.find(ch => ch.name.indexOf("pseudo") >= 0); //"chanelLog" = "pseudo"
        if(!channelLog) return;

        const NotifEmbed = new RichEmbed()
            .setColor('#358844')
            .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
            .setDescription(`Votre nouveau pseudo est : \`${message.content}\`.`)

        message.channel.send(NotifEmbed)
            .then(function(message) {
                message.delete(10000);
            });

        const embed = new RichEmbed()
            .setColor('#358844')
            .setAuthor(`${message.author.username}`,`${message.author.displayAvatarURL}`)
            .setDescription(`A changé de pseudo pour : ${message.author}.`)
            .setTimestamp()
        
        channelLog.send(embed);

        message.member.setNickname(message.content);
        message.member.addRole(NicknameMute).then(console.log(`${message.author.username} muted`));

        message.delete(10000);
        
        setTimeout(function() {
            message.member.removeRole(NicknameMute).then(console.log(`${message.author.username} unmuted`));
        }, 300000); 
    }
});
