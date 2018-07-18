const { Command } = require('discord.js-commando')

module.exports = class CluesCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clues',
      group: 'misc',
      memberName: 'clues',
      description: 'It\'s clues.'
    });
  }

  run(msg) {
    let response = 'Let\'s see if we can find any clues.';

    if (msg.guild && msg.guild.id == '166982436146642946') {
      const clues = msg.guild.emojis.find(emoji => emoji.name === 'clues');

      response += clues ? ' ' + clues : '';
    }

    msg.channel.send(response);
  }
};
