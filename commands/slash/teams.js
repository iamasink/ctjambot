const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder, EmbedBuilder } = require('discord.js')
const fs = require('fs')
const embeds = require('../../structure/embeds')
const path = require('node:path')

function createTeams(group, team) {
	for (let j = 0, len = Math.floor(group.length / 2); j < len; j++) {
		let user = group[0]
		group.splice(0, 1) // remove the user from the array

		// picks a random other user
		let index = Math.floor(Math.random() * group.length)
		let otheruser = group[index]
		console.log(`index = ${index}`)
		group.splice(index, 1) // removes the user at index from the array
		console.log(`picked user ${user} and ${otheruser}`)
		team.push([user, otheruser])
	}
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('teams')
		.setDescription('configure teams')
		.addSubcommand(command => command
			.setName('createmenu')
			.setDescription('Creates a team select menu')
			.addStringOption(option => option
				.setName('datetime')
				.setDescription('The time to show on the message, as a unix timestamp. Use *your* timezone when settings this!')
				.setRequired(true))
		)
		.addSubcommand(command => command
			.setName('pick')
			.setDescription('Picks users from their selected teams')),
	async execute(interaction) {
		console.log(interaction)
		switch (interaction.options.getSubcommand()) {
			case 'createmenu': {
				let timestamp = interaction.options.getString('datetime')

				await interaction.deferReply({ ephemeral: true })
				const row = new ActionRowBuilder()
					.addComponents(
						new SelectMenuBuilder()
							.setCustomId('teams.menu')
							.setPlaceholder('Nothing selected')
							.addOptions(
								{
									label: 'Blender',
									description: 'I am a Blender user and will partner with Blender users',
									value: 'blender',
									emoji: {
										name: 'Blender',
										id: '1043722412287606804',
									}
								},
								{
									label: 'Sketchup',
									description: 'I am a Sketchup user and will partner with Sketchup users',
									value: 'sketchup',
									emoji: {
										name: 'Sketchup',
										id: '1043722441878413353',
									},
								},
								{
									label: '3DS Max',
									description: 'I am a 3DS Max user and will partner with 3DS Max users',
									value: '3dsmax',
									emoji: {
										name: '3DSMax',
										id: '1043722369719611483',
									},
								},
								{
									label: 'Mixed',
									description: 'I will partner with any modelling program',
									value: 'mixed',
									emoji: {
										name: 'Mixed',
										id: '1043922497541779537',
									},
								},
							),
					)
				await interaction.editReply({ embeds: embeds.successEmbed(`Created menu`) })
				await interaction.channel.send({ embeds: embeds.messageEmbed(`Select the Modelling program you use from the list to join the Jelly.\nTeams will be selected on <t:${timestamp}:f>.`), components: [row] })

				break
			}
			case 'pick': {
				await interaction.deferReply({ ephemeral: true })
				console.log("bruhhhh")
				// filepath is joined with path.join because LINUX SUCKS BIG BALLS
				filepath = path.join(__dirname, '..', '..', '..', 'data.json')
				// reads the json file!
				data = await fs.readFileSync(filepath)

				newdata = JSON.parse(data)

				users = newdata.users
				console.log(users)

				// note: 'groups' refers to the 3 groups of users (blender, sketchup, 3dsmax),
				// 		 'teams' refers to the teams of 2 users, who are all a part of one group


				// set the four groups 😀
				let blender = []
				let sketchup = []
				let dsmax = []
				let mixed = []

				// set the four teams, array of arrays of 2 users
				let blenderteams = []
				let sketchupteams = []
				let dsmaxteams = []
				let mixedteams = []

				// sort the users into arrays for each program
				// 		users is an object, so this runs for every key in the object.
				// 		key is the user's id
				// 		value is the user's choice
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
						case 'mixed': {
							mixed.push(key)
							break
						}
					}
				}
				console.log(`blender: ${blender}`)
				console.log(`sketchup: ${sketchup}`)
				console.log(`3dsmax: ${dsmax}`)
				console.log(`mixed: ${mixed}`)


				teamnames = ["Blender", "Sketchup", "3DS Max", "Mixed"]
				teams = [blenderteams, sketchupteams, dsmaxteams, mixedteams]
				groups = [blender, sketchup, dsmax, mixed]

				// for each group,
				for (let i = 0, len = groups.length; i < len; i++) {
					// i is the index of groups, so
					// 	0 = blender
					// 	1 = sketchup
					// 	2 = dsmax
					// 	3 = mixed

					let group = groups[i]
					console.log(group)

					// if theres is a lone user to begin with, they can't join a group, so theyre fucked
					// if (group.length == 1) {
					// 	// fuck off
					// 	// TODO: this.
					// 	console.log("too short")

					// 	// get the user from the group
					// 	let user = group[0]
					// 	// push the user to the mixed group
					// 	groups[3].push(user)
					// 	group.splice(0, 1)

					// 	// send the dm
					// 	let content = { embeds: embeds.messageEmbed(`You have been assigned to the Mixed group as there was no other partners available in your group.`) }
					// 	client.users.send(user, content)


					// everyone can get a group (there may be a group of 3)
					// for every user in this group
					createTeams(group, teams[i])
					if (group.length == 1) { // if there is only one user left, (but not to begin with, ie if teams exist)
						if (i != 3) { // move to mixed group

							// get the user from the group
							let user = group[0]
							// push the user to the mixed group
							groups[3].push(user)
							group.splice(0, 1)
						} else {
							// if mixed
							// move them back to their original group
							user = group[0]
							let oldgroup = users[user]
							// pick a random team for the remaining user
							let content = { embeds: embeds.messageEmbed(`Your team has an extra teammate as they were unable to find a duo.`) }
							switch (oldgroup) {
								case 'blender': {
									groups[0].push(user)
									moveToRandomTeam(blenderteams, user, content)
									group.splice(0, 1)
									break
								}
								case 'sketchup': {
									groups[1].push(user)
									moveToRandomTeam(sketchupteams, user, content)
									group.splice(0, 1)
									break
								}
								case 'dsmax': {
									groups[2].push(user)
									moveToRandomTeam(dsmaxteams, user, content)
									group.splice(0, 1)
									break
								}
								case 'mixed': {
									groups[3].push(user)
									moveToRandomTeam(mixedteams, user, content)
									group.splice(0, 1)
									break
								}
							}
						}
					}

					// dm users their partner.
					// for every team for the group,
					for (let k = 0, len = teams[i].length; k < len; k++) {
						team = teams[i][k]
						// get the list of team members (remember there may be 1, 2 or 3 members.)
						let list = ""
						for (let m = 0, len = team.length; m < len; m++) {
							console.log(team[m])
							list += `<@${team[m]}>\n` // instead of fetching every user, we can just ping their ID.
						}
						let teamname = teamnames[i]
						let content = { embeds: embeds.messageEmbed(`Your **${teamname}** team for the CT Jelly!`, `Here are your team members: \n${list}`) }
						console.log(list)

						// dm every user in the team
						for (let l = 0, len = team.length; l < len; l++) {
							console.log(`team: ${team}, user: ${team[l]}`)
							console.log(team[l])
							client.users.send(team[l], content)
						}
					}
				}

				console.log("picked teams!")
				console.log(`blender:`)
				for (let i = 0, len = blenderteams.length; i < len; i++) {
					console.log(blenderteams[i])
				}
				console.log(`sketchup: `)
				for (let i = 0, len = sketchupteams.length; i < len; i++) {
					console.log(sketchupteams[i])
				}
				console.log(`3dsmax: `)
				for (let i = 0, len = dsmaxteams.length; i < len; i++) {
					console.log(dsmaxteams[i])
				}
				console.log(`mixed: `)
				for (let i = 0, len = mixedteams.length; i < len; i++) {
					console.log(mixedteams[i])
				}


				await interaction.editReply({ embeds: embeds.successEmbed("Teams picked!"), ephemeral: true })
				break
			}

			default: {
				throw new Error("not a subcommand??")
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
				switch (interaction.values[0]) {
					case 'blender': {
						await interaction.reply({ embeds: embeds.successEmbed(`Joined group Blender`), ephemeral: true })
						break
					}
					case 'sketchup': {
						await interaction.reply({ embeds: embeds.successEmbed(`Joined group Sketchup`), ephemeral: true })
						break
					}
					case '3dsmax': {
						await interaction.reply({ embeds: embeds.successEmbed(`Joined group 3DS Max`), ephemeral: true })
						break
					}
					case 'mixed': {
						await interaction.reply({ embeds: embeds.successEmbed(`Joined group Mixed`), ephemeral: true })
					}
					default: {
						throw new Error("what happened!")
					}
				}


				break
			}
			default: {
				throw new Error("wtf2")
			}
		}

	}
}

function moveToRandomTeam(teamslist, user, content) {
	let index = Math.floor(Math.random() * teamslist.length)
	let randomteam = teamslist[index]

	randomteam.push(user)
	// dm every member in the team
	for (let n = 0, len = randomteam.length; n < len; n++) {
		client.users.send(randomteam[n], content)
	}
}
