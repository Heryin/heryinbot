const { ChatClient, SlowModeRateLimiter, AlternateMessageModifier, ConnectionRateLimiter } = require("dank-twitch-irc");
require('dotenv').config();
const { commands } = require('./commands/exportCommands.js');

// bot config
const client = new ChatClient({
    username: 'heryinbot',
    password: process.env.TWITCH_OAUTH_TOKEN,
    rateLimits: 'default',
    maxChannelCountPerConnection: 15
  });

const botDisplayName = "HeryinBot";
const botOwner = 'Heryin';
const botPrefix = 'h!';

// the list of channels the bot will join
let twitchChannels = ['heryin', 'donkey_deleter', 'zneix']

// same message, 1 second slowmode and connection limiting
client.use(new AlternateMessageModifier(client));
client.use(new SlowModeRateLimiter(client, 3));
client.use(new ConnectionRateLimiter(client));
SlowModeRateLimiter.GLOBAL_SLOW_MODE_COOLDOWN = 1;


// message sent to a testing channel about the bot being up
client.on('ready', () => 
    console.log(`Successfully connected to chat`), 
    client.say('donkey_deleter', 'HeryinBot woke up! FeelsDankMan'),
);

client.on('close', (error) => {
  if (error != null) {
    console.error('Client closed due to error: ', error);
  }
});

// connect to twitch and join a list of channels
client.connect();
client.joinAll(twitchChannels);

// display all messages from chats in the terminal
client.on('PRIVMSG', (msg) => {
  console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
});

// commands
client.on('PRIVMSG', (msg) => {

  //pajaS alert for #pajlada, based on pajbot's timer, as a meme response
  if(msg.displayName === 'pajbot' && msg.messageText === 'pajaS 🚨 ALERT' && msg.channelName === 'pajlada'){
    client.me(msg.channelName, "DANKOMEGA 🚨 O JA PIERDOLE");
  }

  //check if prefix is used or if the bot is the author
  const hasPrefix = msg.messageText.startsWith(botPrefix);

  if(!hasPrefix || msg.displayName === botDisplayName){
    return
  }

  //prefix used

  const msgArraySplit = msg.messageText.substring(botPrefix.length).split(' ');
  const usedCommand = msgArraySplit[0];
  const usedCommandArguments = msgArraySplit.slice(1);
  const command = commands.find(command => command.commandName === usedCommand);

  //check if that command exists
  if(command === undefined){
    return;
  }

  //call the command's function
  command(client, msg);
});