const commands = require('../structure/commands')
const embeds = require('../structure/embeds')
const format = require('../structure/format')
const { EmbedBuilder } = require('discord.js')

// Emitted whenever a user joins a guild.

module.exports = {
	name: "guildMemberAdd",
	async execute(member) {

		console.log(`${member.id} has joined guild ${member.guild}`)
		const embed = new EmbedBuilder()
			.setColor('#2ef6db')
			.setTitle(`${member.user.username} has joined.`)
			.setDescription(`Welcome to the Custom Track Jams server!\nMake sure to read the <#500721779468140566> to keep the server **EPIC** <:uhyep:503181763045228554>\n<@${member.user.id}>`)
			.setThumbnail(member.user.avatarURL(true))
		member.guild.systemChannel.send({ embeds: [embed] })
	},
} 