const fs = require("fs");

function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands){
    let singleLine;
    fs.readFile('./commands/pepega/list', 'utf-8', function(err, data){
        if(err){
            throw err;
        }
        //load data into an array
        let allLines = data.split('\n');
        //select a random line
        singleLine = allLines[Math.floor(Math.random()*allLines.length)];
        //send the line into the chat
        client.say(msg.channelName, `@${msg.displayName}, ${singleLine}`);
    });
};

command.commandName = 'pepega';
command.description = 'The command sends a random "Pepega H" line. If you want to submit a new line, \
                       please send it through whispers to the bot owner (might implement some \
                       suggestion command later';

module.exports = command;