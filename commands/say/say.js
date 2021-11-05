require('dotenv').config();
let twitchChannels = process.env.TWITCH_CHANNELS.split(' ');

function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands, lastMessage){
    const remoteChannel = usedCommandArguments[0].substring(1);
    if(msg.senderUserID === botOwnerID || privilagedUsersID.includes(msg.senderUserID)){
        if(twitchChannels.indexOf(remoteChannel) !== -1 && msg.messageText !== 'h!say'){
            if(senderUserID === botOwnerID){
                const message = usedCommandArguments.slice(1).join(' ');

                if(message.startsWith('/me')){
                    if(message === lastMessage){
                        message += ' \u{000e0000}';
                    }
                    client.say(remoteChannel, message);
                }
                else{
                    if(message === lastMessage){
                        message += ' \u{000e0000}';
                    }
                    client.say(remoteChannel, `${message}`);
                }
            }
            else{
                const message = usedCommandArguments.join(' ');
                if(message.startsWith('/me')){
                    if(message === lastMessage){
                        message += ' \u{000e0000}';
                    }
                    client.say(remoteChannel, `${message}`);
                }
                else{
                    if(message === lastMessage){
                        message += ' \u{000e0000}';
                    }
                    client.say(remoteChannel, `${message}`);
                }
            }
        }
        else if(msg.messageText !== 'h!say'){
            const message = usedCommandArguments.join(' ');
            if(message === lastMessage){
                message += ' \u{000e0000}';
            }
            client.say(msg.channelName, `${message}`);
        }
    }
}

command.commandName = 'say';
command.description = 'Makes the bot say the exact line, for now only for use by the bot owner. If the first argument is a channel \
                       this bot has joined, it will say it in that channel';

module.exports = command;