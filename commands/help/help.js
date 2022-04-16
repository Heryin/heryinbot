function command({client: client, msg: msg, commands: commands, lastMessage: lastMessage}){
    let commandList = commands.map(command => command.commandName).join(', ');
    let message = `@${msg.displayName}, Available commands: ${commandList}`;
    return message;
}

command.commandName = 'help';
command.description = 'Shows the list of commands'
command.userCooldown = 10000; // in milliseconds

module.exports = command;