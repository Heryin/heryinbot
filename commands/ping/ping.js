function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands, lastMessage){
    let message = `@${msg.displayName}, Pong! FeelsDankMan`
    if(message !== lastMessage){
        client.say(msg.channelName, message);
    }
    else{
        message += ' \u{000e0000}';
        client.say(msg.channelName, message);
    }
}

command.commandName = 'ping';
command.description = 'Pings and responds to the user that used the command (nothing really to add here)'

module.exports = command;