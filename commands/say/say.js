require('dotenv').config();
let twitchChannels = process.env.TWITCH_CHANNELS.split(' ');
let botPrefix = process.env.BOT_PREFIX;

function command({client: client, msg: msg, arguments: arguments, botOwnerID: botOwnerID, privilagedUsersID: privilagedUsersID, lastMessage: lastMessage}) {

    const checkForMe = arguments[0];
    const meMessage = checkForMe.startsWith('/me');

    if (msg.senderUserID === botOwnerID || privilagedUsersID.includes(msg.senderUserID) && msg.messageText !== `${botPrefix}say`) {
        const remoteChannel = arguments[0].substring(1);
        if (twitchChannels.includes(remoteChannel) && msg.senderUserID === botOwnerID) {

                let message = arguments.slice(1).join(' ');

                if (message === lastMessage) {
                    message += ' \u{000e0000}';
                }
                client.privmsg(remoteChannel, message);
        }

            else if(msg.senderUserID === botOwnerID){

                let message = arguments.join(' ');

                    if (message === lastMessage) {
                        message += ' \u{000e0000}';
                    }
                    client.privmsg(msg.channelName, message);
            }

            else if(!twitchChannels.includes(remoteChannel) || twitchChannels.includes(remoteChannel)){

                let message = arguments.join(' ');
                let messageSliced = arguments.slice(1).join(' ');

                if (meMessage) {
                    if (messageSliced === lastMessage) {
                        messageSliced += ' \u{000e0000}';
                    }
                    client.me(msg.channelName, `\u{000e0000} ${messageSliced}`);
                }
                else {
                    if (message === lastMessage) {
                        message += ' \u{000e0000}';
                    }
                    client.say(msg.channelName, `\u{000e0000} ${message}`);
                }
            }
        }
}

command.commandName = 'say';
command.description = 'Makes the bot say the exact line, for now only for use by the bot owner and privilaged users. \
                       If the first argument is a channel this bot has joined, it will say it in that channel \
                       Bot owner only: also allows for remote built-in command execution';
command.userCooldown = 10000; // in milliseconds

module.exports = command;