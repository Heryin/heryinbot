function command(client, msg){
    client.say(msg.channelName, `@${msg.displayName}, I'm a smol bot made in Node.js by @Heryin, no idea what my purpose is yet, but for now he's learning to make a bot FeelsDankMan`);
}

command.commandName = 'bot';

module.exports = command;