function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands){
    let commandList = commands.map(command => command.commandName).join(', ');
    client.say(msg.channelName, `@${msg.displayName}, Available commands: ${commandList}`);
}

command.commandName = 'help';
command.description = 'Shows the list of commands'

module.exports = command;