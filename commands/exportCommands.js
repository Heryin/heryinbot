const ping = require('./ping/ping.js');
const bot = require('./bot/bot.js');
const pepega = require('./pepega/pepega.js');
const say = require('./say/say.js');


module.exports = {
    commands: [
        ping,
        bot,
        pepega,
        say
    ]
};