const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hypergeom')
        .setDescription('Donne les statistiques que vous avez de piocher les cartes désirés')

        .addIntegerOption(szDeck =>
            szDeck.setMaxValue(60)
                .setMinValue(40)
                .setRequired(true)
                .setDescription('Ce paramètre représente la taille du deck')
                .setName('szdeck'))

        .addIntegerOption(nbDeckSuccess =>
            nbDeckSuccess
                .setMinValue(1)
                .setRequired(true)
                .setDescription('Ce paramètre le nombre de succès possible dans le deck, si vous jouez une carte x 3, mettez 3')
                .setName('nbdecksuccess'))

        .addIntegerOption(szMain =>
            szMain
                .setMinValue(1)
                .setRequired(true)
                .setDescription('Ce paramètre défini le nombre de cartes dans votre main')
                .setName('szmain'))

        .addIntegerOption(nbMainSuccess =>
            nbMainSuccess
                .setMinValue(1)
                .setRequired(true)
                .setName('nbmainsuccess')
                .setDescription('Ce paramètre défini le nombre de fois que vous voulez tirer la carte')),

    async execute(interaction) {
        const szDeck = interaction.options.getInteger('szdeck');
        const nbDeckSuccess = interaction.options.getInteger('nbdecksuccess');
        const szMain = interaction.options.getInteger('szmain');
        const nbMainSuccess = interaction.options.getInteger('nbmainsuccess');

        function hypergeometricProbability(szDeck, nbDeckSuccess, szMain, nbMainSuccess) {
            // Check for invalid input
            if (
                szDeck < 0 ||
                nbDeckSuccess < 0 ||
                szMain < 0 ||
                nbMainSuccess < 0 ||
                nbDeckSuccess > szDeck ||
                nbMainSuccess > szMain
            ) {
                return "Invalid input";
            }

            // Calculate the hypergeometric probability
            const numerator =
                combination(nbDeckSuccess, nbMainSuccess) *
                combination(szDeck - nbDeckSuccess, szMain - nbMainSuccess);
            const denominator = combination(szDeck, szMain);

            return numerator / denominator;
        }

        function hypergeometricProbabilitySum(szDeck, nbDeckSuccess, szMain, nbMainSuccess) {
            // Check for invalid input
            if (
                szDeck < 0 ||
                nbDeckSuccess < 0 ||
                szMain < 0 ||
                nbMainSuccess < 0 ||
                nbDeckSuccess > szDeck ||
                nbMainSuccess > szMain
            ) {
                return "Invalid input";
            }
        
            // Calculate the hypergeometric probability for nbMainSuccess or more
            let probabilitySum = 0;
            for (let k = nbMainSuccess; k <= Math.min(nbDeckSuccess, szMain); k++) {
                probabilitySum += (
                    combination(nbDeckSuccess, k) *
                    combination(szDeck - nbDeckSuccess, szMain - k)
                ) / combination(szDeck, szMain);
            }
        
            return probabilitySum;
        }

        // Function to calculate the combination (n choose k)
        function combination(n, k) {
            if (k === 0 || k === n) {
                return 1;
            } else {
                return (
                    factorial(n) / (factorial(k) * factorial(n - k))
                );
            }
        }

        // Function to calculate the factorial
        function factorial(num) {
            if (num === 0 || num === 1) {
                return 1;
            } else {
                return num * factorial(num - 1);
            }
        }
        let probability = hypergeometricProbability(szDeck, nbDeckSuccess, szMain, nbMainSuccess);
        if (probability === "Invalid input") {
            await await interaction.reply('Il y a un problème avec vos variables');
        }
        else {
            let probabilitySum = hypergeometricProbabilitySum(szDeck, nbDeckSuccess, szMain, nbMainSuccess);
            probability = probability * 1000;
            probability = Math.floor(probability);
            probability = probability / 10;
            probabilitySum = probabilitySum * 1000;
            probabilitySum = Math.floor(probabilitySum);
            probabilitySum = probabilitySum / 10;
             await interaction.reply('Avec ces données, vous avez ' + probability + ' % de chances d\'obtenir la carte ' + nbMainSuccess + ' fois et ' + probabilitySum + ' % d\'avoir ' + nbMainSuccess + ' fois ou plus la carte.');
            }
    },
};
