const { SlashCommandBuilder } = require('discord.js')
const embeds = require('../../structure/embeds')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Bot info!'),
	async execute(interaction) {
		interaction.reply({
			embeds: embeds.messageEmbed(
				"CT Jam Bot",
				`The Official Custom Track Jams Bot.\nWritten by **iamasink** and **Bearably**`
			),
			components: new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setLabel('GitHub')
						.setStyle(ButtonStyle.Link)
						.setURL("https://github.com/iamasink/ctjambot"),
				)
		})
	},
}