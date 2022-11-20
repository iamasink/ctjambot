const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const embeds = require('../../structure/embeds')
const path = require('node:path')

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
		await interaction.deferReply({ ephemeral: true })
		data = await fs.readFileSync(path.join(__dirname, '..', '..', 'data.json'))

		newdata = JSON.parse(data)
		users = newdata.users
		//users.splice(users.findIndex(e => e.id === interaction.user.tag, 1, { "id": interaction.user.id, "value": interaction.values[0] }))
		users[interaction.user.id] = interaction.values[0]


		console.log(users)
		console.log(interaction.user.id)
		console.log(interaction.user.tag)
		console.log(interaction.customId)
		console.log(interaction.values[0])


		await interaction.editReply({ embeds: embeds.successEmbed(`Joined group ${interaction.values[0]}`) })
		newdata.users = users
		fs.writeFileSync(path.join(__dirname, '..', '..', 'data.json'), JSON.stringify(newdata))

	}
}