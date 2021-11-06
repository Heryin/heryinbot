function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands, lastMessage){
    const message = `@${msg.displayName}, I'm a smol bot made in Node.js by @${botOwner}, no idea what my purpose is yet, for now he's learning to make a bot FeelsDankMan`;
    if(message === lastMessage){
        message += ' \u{000e0000}';
    }
    client.say(msg.channelName, message);
}

command.commandName = 'bot';
command.description = 'A short note about the bot, the owner and the language it was written in.';

module.exports = command;