const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spydraw')
		.setDescription('Replay du WCQ Agen de Hugo !'),
	async execute(interaction) {
		await interaction.reply('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXZ6enlwZzZqdnR1enpkb3AyanQyNThob3NlOW5iajRnamViejliciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4aMdKMV2Dy4cwW2koH/giphy-downsized-large.gif');
	},
};
