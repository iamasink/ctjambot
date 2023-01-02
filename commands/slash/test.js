const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const database = require('../../structure/database')
const embeds = require('../../structure/embeds')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test!')
		.addStringOption(option => option
			.setName('text')
			.setDescription('text lol')
		),
	async execute(interaction) {
		console.log(interaction)
		await interaction.reply("hi")
		database.set(".hi.testy", { "test": "success" })
	},
}