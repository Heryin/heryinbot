function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands){
    client.say(msg.channelName, `@${msg.displayName}, Pong! FeelsDankMan`);
}

command.commandName = 'ping';
command.description = 'Pings and responds to the user that used the command (nothing really to add here)'

module.exports = command;