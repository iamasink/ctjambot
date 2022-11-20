const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const embeds = require('../../structure/embeds')
const path = require('node:path')

module.exports = {
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
							emoji: {
								name: 'Blender',
								id: '1043722412287606804',
							}
						},
						{
							label: 'Sketchup',
							description: 'I use sketchup 😡',
							value: 'sketchup',
							emoji: {
								name: 'Sketchup',
								id: '1043722441878413353',
							},
						},
						{
							label: '3DS Max',
							description: 'I use the nintendo 3ds',
							value: '3dsmax',
							emoji: {
								name: '3DSMax',
								id: '1043722369719611483',
							},
						},
					),
			)

		await interaction.editReply({ embeds: embeds.messageEmbed(`Select the Modeling program you use from the list to join the Jelly.\nTeams will be selected on <t:1670180400:f>.`), components: [row] })


	},
	async menu(interaction) {
		filepath = path.join(__dirname, '..', '..', '..', 'data.json')
		console.log(interaction.guild.emojis)
		data = await fs.readFileSync(filepath)

		newdata = JSON.parse(data)
		users = newdata.users
		//users.splice(users.findIndex(e => e.id === interaction.user.tag, 1, { "id": interaction.user.id, "value": interaction.values[0] }))
		users[interaction.user.id] = interaction.values[0]


		console.log(users)
		console.log(interaction.user.id)
		console.log(interaction.user.tag)
		console.log(interaction.customId)
		console.log(interaction.values[0])


		newdata.users = users
		fs.writeFileSync(filepath, JSON.stringify(newdata))
		await interaction.reply({ embeds: embeds.successEmbed(`Joined group ${interaction.values[0]}`) })

	}
}