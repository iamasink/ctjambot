const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const embeds = require('../../structure/embeds')
const path = require('node:path')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('teams')
		.setDescription('configure teams')
		.addSubcommand(command => command
			.setName('createmenu')
			.setDescription('Creates a team select menu'))
		.addSubcommand(command => command
			.setName('pick')
			.setDescription('Picks users from their selected teams')),
	async execute(interaction) {
		console.log(interaction)

		await interaction.deferReply()
		switch (interaction.options.getSubcommand()) {
			case 'createmenu': {
				const row = new ActionRowBuilder()
					.addComponents(
						new SelectMenuBuilder()
							.setCustomId('teams.menu')
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

				await interaction.editReply({ embeds: embeds.messageEmbed(`Select the Modelling program you use from the list to join the Jelly.\nTeams will be selected on <t:1670180400:f>.`), components: [row] })

				break
			}
			case 'pick': {
				console.log("bruhhhh")
				// filepath is joined with path.join because LINUX SUCKS BIG BALLS
				filepath = path.join(__dirname, '..', '..', '..', 'data.json')
				// reads the json file!
				data = await fs.readFileSync(filepath)

				newdata = JSON.parse(data)

				users = newdata.users
				console.log(users)

				// set the three groups 😀
				let blender = []
				let sketchup = []
				let dsmax = []


				// users is an object, so this runs for every key in the object.
				// key is the id
				// value is the choice
				for (key in users) {
					console.log(key)
					let value = users[key]
					console.log(value)
					switch (value) {
						case 'blender': {
							blender.push(key)
							break
						}
						case 'sketchup': {
							sketchup.push(key)
							break
						}
						case '3dsmax': {
							dsmax.push(key)
							break
						}
					}
				}
				console.log(`blender: ${blender}`)
				console.log(`sketchup: ${sketchup}`)
				console.log(`3dsmax: ${dsmax}`)



				// // sort the users into arrays for each program
				// for (let i = 0, len = users.length; i < len; i++) {

				// }
				groups = [blender, sketchup, dsmax]
				for (let i = 0, len = groups.length; i < len; i++) {
					let group = groups[i]
					console.log(group)

					// if theres is a lone user to begin with, they can't join a group, so theyre fucked
					if (group.length == 1) {
						// fuck off
						console.log("too short")

					} else {
						// everyone can get a group (perhaps group of 3)
						for (let j = 0, len = group.length; j < len; j++) {
							let user = group[i]
							// remove the first user from the array
							group.splice(0, 1)
							// picks a random user
							let otheruser = group[Math.floor(Math.random() * group.length)]


						}
					}
				}




				break
			}
			default: {
				throw new Error("wtf")
			}
		}


	},
	async menu(interaction) {
		switch (interaction.customId.split('.')[1]) {
			case 'menu': {
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

				break
			}
			default: {
				throw new Error("wtf2")
			}
		}

	}
}