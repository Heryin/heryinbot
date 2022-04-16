const https = require('https');

async function command({client: client, msg: msg, arguments: arguments, lastMessage: lastMessage}) {

    const playername = arguments.join(' ');

    https.get(`https://supinic.com/api/osrs/lookup/${playername}`, (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        let result = '';
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            result = JSON.parse(data);
            if(result.statusCode === 404 || !resp || !result){
                let message = `@${msg.displayName}, No data was found for character name "${playername}"!`;
                return message;
            }

            let message = `@${msg.displayName}, Stats for character ${playername}: 🏆 ${result.data.skills[0].level} ⚔ ${result.data.skills[1].level} \
             ✊ ${result.data.skills[3].level} 🛡 ${result.data.skills[2].level} 🏹 ${result.data.skills[5].level} ✨ ${result.data.skills[6].level} \
              🧙 ${result.data.skills[7].level} ➰ ${result.data.skills[21].level} 🏡 ${result.data.skills[23].level} ♥ ${result.data.skills[4].level} \
              🏃 ${result.data.skills[17].level} 🌿 ${result.data.skills[16].level} 💰 ${result.data.skills[18].level} 🛠 ${result.data.skills[13].level} \
              🔪 ${result.data.skills[10].level} 💀 ${result.data.skills[19].level} 🐾 ${result.data.skills[22].level} ⛏ ${result.data.skills[15].level} \
              🔨 ${result.data.skills[14].level} 🐟 ${result.data.skills[11].level} 🍲 ${result.data.skills[8].level} 🔥 ${result.data.skills[12].level} \
              🌳 ${result.data.skills[9].level} 🌽 ${result.data.skills[20].level} XP: ${result.data.skills[0].experience.toLocaleString('pl-PL')}`;
            return message;
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

        
}

command.commandName = 'osrs';
command.description = 'Displays skill levels of the specified character.';
command.userCooldown = 10000; // in milliseconds

module.exports = command;