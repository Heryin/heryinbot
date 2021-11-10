let hiscore = require('osrs-json-hiscores');

async function command(client, msg, usedCommandArguments, botOwner, botOwnerID, privilagedUsersID, commands, lastMessage){

    if(usedCommandArguments === undefined || usedCommandArguments === null){
        let message = `@${msg.displayName}, You need to provide the character's name!`
        if(message === lastMessage){
            message += ' \u{000e0000}';
        }
        client.say(msg.channelName, message);
        return;
    }

    if(usedCommandArguments !== undefined && usedCommandArguments !== null){
        const player = usedCommandArguments.join(' ');
        const result = await hiscore.getStats(player);

        console.log(result.main.skills.attack.level);

        let message = `@${msg.displayName}, Stats for character ${result.name}: 🏆 ${result.main.skills.overall.level} ⚔ ${result.main.skills.attack.level} ✊ ${result.main.skills.strength.level} 🛡 ${result.main.skills.defence.level} 🏹 ${result.main.skills.ranged.level} ✨ ${result.main.skills.prayer.level} 🧙 ${result.main.skills.magic.level} ➰ ${result.main.skills.runecraft.level} 🏡 ${result.main.skills.construction.level} ♥ ${result.main.skills.hitpoints.level} 🏃 ${result.main.skills.agility.level} 🌿 ${result.main.skills.herblore.level} 💰 ${result.main.skills.thieving.level} 🛠 ${result.main.skills.crafting.level} 🔪 ${result.main.skills.fletching.level} 💀 ${result.main.skills.slayer.level} 🐾 ${result.main.skills.hunter.level} ⛏ ${result.main.skills.mining.level} 🔨 ${result.main.skills.smithing.level} 🐟 ${result.main.skills.fishing.level} 🍲 ${result.main.skills.cooking.level} 🔥 ${result.main.skills.firemaking.level} 🌳 ${result.main.skills.woodcutting.level} 🌽 ${result.main.skills.farming.level} XP: ${result.main.skills.overall.xp.toLocaleString('pl-PL')}`;
        if(message === lastMessage){
            message += ' \u{000e0000}';
        }
        client.say(msg.channelName, message);
    }
    else{
        return;
    }
}

command.commandName = 'osrs';
command.description = 'Displays skill levels of the specified character.';

module.exports = command;