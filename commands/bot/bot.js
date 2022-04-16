function command({client: client, msg: msg, lastMessage: lastMessage}){
    const message = `@${msg.displayName}, I'm a smol bot made in Node.js by @Heryin, no idea what my purpose is yet, for now he's learning to make a bot. GitHub link: https://github.com/heryin/heryinbot FeelsDankMan`;
    return message;
}

command.commandName = 'bot';
command.description = 'A short note about the bot, the owner and the language it was written in.';
command.userCooldown = 10000; // in milliseconds

module.exports = command;