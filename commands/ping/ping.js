function command({client: client, msg: msg, lastMessage: lastMessage}){
    let message = `@${msg.displayName}, Pong! FeelsDankMan`
    return message;
}

command.commandName = 'ping';
command.description = 'Pings and responds to the user that used the command (nothing really to add here)'
command.userCooldown = 10000; // in milliseconds

module.exports = command;