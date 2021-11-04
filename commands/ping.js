function command(client, msg){
    client.say(msg.channelName, `@${msg.displayName}, Pong! FeelsDankMan`);
}

command.commandName = 'ping';

module.exports = command;