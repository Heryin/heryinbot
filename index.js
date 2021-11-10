const { ChatClient, SlowModeRateLimiter, AlternateMessageModifier, ConnectionRateLimiter } = require("dank-twitch-irc");
require('dotenv').config();

// bot config
const client = new ChatClient({
    username: process.env.BOT_USERNAME,
    password: process.env.TWITCH_OAUTH_TOKEN,
    rateLimits: 'default',
    maxChannelCountPerConnection: 15
  });

// some data about the bot, the owner and privilaged users
const botDisplayName = process.env.BOT_DISPLAY_NAME;
const botOwner = process.env.BOT_OWNER;
const botOwnerID = process.env.BOT_OWNER_ID;
const botPrefix = process.env.BOT_PREFIX;
const wakeUpChannel = process.env.WAKE_UP_CHANNEL;
const privilagedUsersID = process.env.PRIVILAGED_USERS_ID.split(' ');
const globalCooldown = 1000;

// the list of channels the bot will join
const twitchChannels = process.env.TWITCH_CHANNELS.split(' ');

// connection limiting
client.use(new ConnectionRateLimiter(client));

// message sent to a testing channel about the bot being up
client.on('ready', () => 
    console.log(`Successfully connected to chat`), 
    client.say(wakeUpChannel, `${botDisplayName} woke up! FeelsDankMan`)
);

client.on('close', (error) => {
  if (error != null) {
    console.error('Client closed due to error: ', error);
  }
});

// connect to twitch and join a list of channels
client.connect();
client.joinAll(twitchChannels);



// commands
let { commands } = require('./commands/exportCommands.js');
let lastMessage;
let onGlobalCooldown = false;
client.on('PRIVMSG', (msg) => {

  // display all messages from chats in the terminal
  console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);

  // save bot's last message
  if(msg.displayName === botDisplayName){
    onGlobalCooldown = true;
    setTimeout(() => { onGlobalCooldown = false;},  globalCooldown); 
    lastMessage = msg.messageText;
  }

  // pajaS alert for #pajlada, based on pajbot's timer, as a meme response
  if(msg.displayName === 'pajbot' && msg.messageText === 'pajaS 🚨 ALERT' && msg.channelName === 'pajlada'){
    client.me(msg.channelName, "DANKOMEGA 🚨 O JA PIERDOLE");
  }

  // if the global cooldown is on, go back, I should add some queue later on
  if(onGlobalCooldown){
    return;
  }

  // check if prefix is used or if the bot is the author
  const hasPrefix = msg.messageText.startsWith(botPrefix);

  if(!hasPrefix || msg.senderUsername === botDisplayName){
    return
  }

  // prefix used

  const msgArraySplit = msg.messageText.substring(botPrefix.length).split(' ');
  const usedCommand = msgArraySplit[0];
  const usedCommandArguments = msgArraySplit.slice(1);
  const command = commands.find(command => command.commandName === usedCommand);

  // check if that command exists
  if(command === undefined){
    return;
  }

  // call the command's function
  command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands, lastMessage);
  if(msg.displayName === botDisplayName){
    onGlobalCooldown = true;
    setTimeout(() => { onGlobalCooldown = false;},  globalCooldown); 
  }
});