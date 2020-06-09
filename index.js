const {
  Client,
  Attachment
} = require('discord.js');

const bot = new Client();

const ytdl = require("ytdl-core");

const token = "NzE1MjU5MDEzMzczMjMxMTU2.XtVEbQ.x-kyQEHrMQUhwzN8pTfN43puOo8";

const PREFIX = 'h!';

var version = '1.0'

var servers = {};

bot.on('ready', () => {
  console.log('This bot is online!!!!! ' + version);

})

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
      default:
      message.content.startsWith(PREFIX)

      case 'play':
       }
          function play(connection, message) {

              var server = servers[message.guild.id];

              server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audio"}));

              server.queue.shift();

              server.dispatcher.on("end", function() {
                  if(server.queue[0]){
                      play(connection, message);
                  }else{
                      connection.disconnect();
                  }
              });
          }
          
          //queues
          if(!servers[message.guild.id]) servers[message.guild.id] = {
              queue: []
          }

          var server = servers[message.guild.id];

          server.queue.push(args[1]);

          if(!message.guild.voiceConnection) message.member.voice.channel.join().then(function(connection){
              play(connection, message);
          })
        })
bot.login(token);