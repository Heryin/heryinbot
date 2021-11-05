require('dotenv').config();
let twitchChannels = process.env.TWITCH_CHANNELS.split(' ');

function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID){
    const remoteChannel = usedCommandArguments[0].substring(1);
    let isPrivilaged = false;
    for(let i=0; i<privilagedUsersID.length; i++){
        if(msg.senderUserID === privilagedUsersID[i]){
            isPrivilaged = true;
        }
    }
    if(msg.senderUserID === botOwnerID || isPrivilaged){
        const checkLine = usedCommandArguments.join(' ');
        if(twitchChannels.indexOf(remoteChannel) !== -1 && msg.messageText !== 'h!say'){
            const theLine = usedCommandArguments.splice(1).join(' ');
            client.say(remoteChannel, `${theLine}`);
        }
        else if(checkLine !== undefined && checkLine !== null && checkLine !== ' ' && msg.messageText !== 'h!say'){
            const theLine = usedCommandArguments.join(' ');
            client.say(msg.channelName, `${theLine}`);
        }
    }
}

command.commandName = 'say';
command.description = 'Makes the bot say the exact line, for now only for use by the bot owner. If the first argument is a channel \
                       this bot has joined, it will say it in that channel';

module.exports = command;