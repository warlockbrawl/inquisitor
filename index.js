const path = require('path');
const sqlite = require('sqlite');
const Commando = require('discord.js-commando');

const config = require(path.join(__dirname, 'config.json'));

const client = new Commando.Client({
    owner: config.auth.owner,
    commandPrefix: null,
    disableEveryone: true,
    unknownCommandResponse: false
});

client.registry
  .registerGroups([
      ['misc', 'Miscellaneous']
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.on('ready', () => {
  console.log('Logged in to Discord.');
});

client.login(config.auth.token);

function destructor() {
  console.log('Process exiting, destroying client...');
  client.destroy();
}

process.on('exit', destructor);
process.on('SIGINT', destructor);
process.on('SIGUSR1', destructor);
process.on('SIGUSR2', destructor);
process.on('unhandledRejection', error => {
  console.log(error);
  process.exit(2);
});
