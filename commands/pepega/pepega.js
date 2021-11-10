const fs = require("fs");

function command({client: client, msg: msg, lastMessage: lastMessage}){
    fs.readFile('./commands/pepega/list', 'utf-8', function(err, data){
        if(err){
            throw err;
        }
        //load data into an array
        let allLines = data.split('\n');
        //select a random line
        let message = allLines[Math.floor(Math.random()*allLines.length)];
        //send the line into the chat
        if(message !== lastMessage){
            client.say(msg.channelName, `@${msg.displayName}, ${message}`);
        }
        else{
            message += ' \u{000e0000}';
            client.say(msg.channelName, `@${msg.displayName}, ${message}`);
        }
    });
};

command.commandName = 'pepega';
command.description = 'The command sends a random "Pepega H" line. If you want to submit a new line, \
                       please send it through whispers to the bot owner (might implement some \
                       suggestion command later';

module.exports = command;