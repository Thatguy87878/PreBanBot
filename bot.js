console.log('Turning On');
// requiring there be a system called DOTENV which allows for ids and the token to be stored in a .env file
require("dotenv").config();
// Logining into the discord bot and requiring the discord api
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

//Tells me when the bot is ready and active
var ids = process.env.MODCHANNEL //put the mod bot spam channel id in the .env file
var od = process.env.LEFTCHANNEL //put the mod #left channel

client.on("ready", readyDiscord);

function readyDiscord() {
    console.log('Connected to Discord API')
}

client.on('message', gotMessage);

function gotMessage(msg) {
    console.log(msg.content);
    var channelID = msg.channel.id;
    var guild = msg.guild;
    if(channelID == ids){
        if (!msg.content.startsWith(':bb') || msg.author.bot){
            if(msg.content == ':ping'){
                msg.channel.send('I am still active')
                console.log('Working test')
            }else if(msg.content == ':help'){
                msg.channel.send({embed: {
                    color: 3447003,
                    author: {
                      name: client.user.username,
                    },
                    title: "Help Panel for Pre Ban Bot",
                    
                    fields: [{
                        name: ":help",
                        value: "Please tell me you didn't open this panel for this"
                      },
                      {
                        name: ":ping",
                        value: "Simple ping to let you know if the bot is still alive"
                      },
                      {
                        name: ":bb add id",
                        value: "Will ban the given id"
                      },
                      {
                        name: ":bb remove id",
                        value: "Will unban the given id"
                      }
                    ],
                    timestamp: new Date(),
                  }
                });
            }else if (msg.content == ':ee'){
                msg.channel.send('You Found and easter egg congrats!');
            }else if(msg.content == ':list'){
                guild.fetchBans().then(banned => {});
                msg.channel.send(banned)
                
            }
        } else {
            const args = msg.content.slice(3).trim().split(' ');
            console.log(args);
            var feedback = banboy(args, guild);
            if (feedback == 'added'){
                msg.channel.send('Id added to list');
            }else if(feedback == 'removed'){
                msg.channel.send('Id removed from the list');
            }else{
                msg.channel.send('Not a vaild Syntax for *!bb*')
            }
        }
    }else{
        return;
    }
}
function banboy(args, guild){
    var arg1 = args.slice(0,1);
    arg1 = String(arg1);
    var arg2 = args.slice(1,2);
    arg2 = String(arg2);
    if (arg1 == 'add'){
        
        guild.members.ban(arg2);
        
        var feedback = 'added';
        return feedback;
    }else if (arg1 == 'remove'){
        guild.members.unban(arg2);
        var feedback = 'removed';
        return feedback;
    }else{
        console.log('invaild command returning')
        var feedback = 'Invaild Command';
        return feedback;
    }
}

client.on('guildMemberRemove', function(member){
    member = member.user.tag;
    client.channels.cache.get(od).send(member + ' has left!');
});