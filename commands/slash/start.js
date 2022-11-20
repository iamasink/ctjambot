const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } = require('discord.js')


module.exports = {
	permission: `botowner`,
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('start the thingie!'),
	async execute(interaction) {
		console.log(interaction)

		await interaction.deferReply()
		const row = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('start.menu')
					.setPlaceholder('Nothing selected')
					.addOptions(
						{
							label: 'Blender',
							description: 'I use blender 😀',
							value: 'blender',
						},
						{
							label: 'Sketchup',
							description: 'I use sketchup 😡',
							value: 'sketchup',
						},
						{
							label: '3DS Max',
							description: 'I use the nintendo 3ds',
							value: '3dsmax',
						},
					),
			)

		await interaction.editReply({ content: 'Pong!', components: [row] })

	},
	async menu(interaction) {
		console.log(interaction.user.id)

	}
}