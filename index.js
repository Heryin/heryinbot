const { ChatClient, SlowModeRateLimiter, AlternateMessageModifier, ConnectionRateLimiter } = require("dank-twitch-irc");
require('dotenv').config();

// bot config
let client = new ChatClient({
    username: "heryinbot",
    password: process.env.TWITCH_OAUTH_TOKEN,
    rateLimits: 'default',
    maxChannelCountPerConnection: 15
  });

let botOwner = "Heryin";
let botPrefix = "h!";

// the list of channels the bot will join
let twitchChannels = ["heryin", "donkey_deleter", "pajlada"]

// same message, 1 second slowmode and connection limiting
client.use(new AlternateMessageModifier(client));
client.use(new SlowModeRateLimiter(client, 3));
client.use(new ConnectionRateLimiter(client));
SlowModeRateLimiter.GLOBAL_SLOW_MODE_COOLDOWN = 1;


// message sent to a testing channel about the bot being up
client.on("ready", () => 
    console.log(`Successfully connected to chat`), 
    client.say('donkey_deleter', 'HeryinBot woke up! FeelsDankMan'),
);

client.on("close", (error) => {
  if (error != null) {
    console.error("Client closed due to error: ", error);
  }
});

// connect to twitch and join a list of channels
client.connect();
client.joinAll(twitchChannels);

// display all messages from chats in the terminal
client.on("PRIVMSG", (msg) => {
  console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
  evalStr = msg.messageText;
  if(msg.displayName === botOwner){
    checkEvalStr = evalStr.substring(0, 6);
    evalMessage = evalStr.substring(8);
  }
});

// commands
client.on("message", (msg) => {
    if(msg.messageText === `${botPrefix}ping`){
        client.say(msg.channelName, "Pong! ApuApustaja");
    }
    if(msg.messageText === `${botPrefix}bot`){
        client.say(msg.channelName, "I'm a smol bot made in Node.js by @Heryin, no idea what my purpose is yet, but for now he's learning to make a bot Okayge");
    }
    if(msg.displayName === "pajbot" && msg.messageText === "pajaS 🚨 ALERT" && msg.channelName === "pajlada"){
        client.say(msg.channelName, "DANKOMEGA 🚨 O JA PIERDOLE")
    }
});