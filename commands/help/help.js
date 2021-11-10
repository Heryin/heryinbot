function command(client, msg, commands, lastMessage){
    let commandList = commands.map(command => command.commandName).join(', ');
    let message = `@${msg.displayName}, Available commands: ${commandList}`;
    if(message !== lastMessage){
        client.say(msg.channelName, message);
    }
    else{
        message += ' \u{000e0000}';
        client.say(msg.channelName, message);
    }
}

command.commandName = 'help';
command.description = 'Shows the list of commands'

module.exports = command;