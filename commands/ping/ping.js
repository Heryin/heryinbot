function command({client: client, msg: msg, lastMessage: lastMessage}){
    let message = `@${msg.displayName}, Pong! FeelsDankMan`
    if(message !== lastMessage){
        message += ' \u{000e0000}';
    }
        client.say(msg.channelName, message);
}

command.commandName = 'ping';
command.description = 'Pings and responds to the user that used the command (nothing really to add here)'

module.exports = command;