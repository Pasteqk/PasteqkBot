const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meta')
		.setDescription('Donne la meilleur réponse possible!'),
	async execute(interaction) {
        let num = Math.random();
        num = num * 4;
        num = Math.floor(num);

        switch(num){
            case 0:
                await interaction.reply('Je ne sais pas je ne suis qu\'un robot, mais tout ce que je sais c\'est qu\'il ne faut pas écouter benjamin!');
                break;
            case 1:
                await interaction.reply('Je ne sais pas je ne suis qu\'un robot, demandez à mon maître Antoine, il est le meilleur joueur de la voie lactée !');
                break;
            case 2:
                const message = await interaction.reply({content: 'RESCUE ACE BEST DECK !!!!!!', fetchReply: true });
                message.react('🔥');
                break;
            case 3:
                await interaction.reply({content: 'Samuel vous dira que Spright est le meilleur, car grâce à ces conseils vous pouvez faire gigantic avec une XYZ 2 ! ', fetchReply: true });
                break;

        }
	},
};