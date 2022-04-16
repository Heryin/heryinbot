const fs = require("fs");

function command({client: client, msg: msg, lastMessage: lastMessage}){
    let allLines = fs.readFileSync('./commands/pepega/list', 'utf-8').split('\n');
    let message = allLines[Math.floor(Math.random()*allLines.length)];
    return message;
};

command.commandName = 'pepega';
command.description = 'The command sends a random "Pepega H" line. If you want to submit a new line, \
                       please send it through whispers to the bot owner (might implement some \
                       suggestion command later';
command.userCooldown = 10000; // in milliseconds

module.exports = command;