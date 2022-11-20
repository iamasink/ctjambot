const fs = require('node:fs')
const path = require('node:path')
const { clientId, token } = require('../config.json')
const { REST } = require('@discordjs/rest')
const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Routes, SlashCommandBuilder } = require('discord.js')
const embeds = require('./embeds')
const { permissions } = require('../config.json')

function merge(a, b, prop) {
	var reduced = a.filter(aitem => !b.find(bitem => aitem[prop] === bitem[prop]))
	return reduced.concat(b)
}

async function refreshGlobalCommands() {
	const rest = new REST({ version: '10' }).setToken(token)
	commandList = await (await getCommands()).concat(await getContextMenuCommands())
	console.log(commandList)
	try {
		console.log(`Started refreshing ${commandList.length} global application (/) commands.`)

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commandList },
		)

		console.log(`Successfully reloaded ${data.length} global application (/) commands.`)
		return data.length
	} catch (error) {
		console.error(error)
		throw error
	}
}
async function refreshGuildCommands(guildId) {
	const rest = new REST({ version: '10' }).setToken(token)
	commandList = []

	commands = []

	console.log(commandList)

	try {
		console.log(`Started refreshing ${commandList.length} guild application (/) commands.`)

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commandList }
		)


		console.log(`Successfully reloaded ${data.length} guild application commands.`)

	}
	catch (error) {
		console.error(error)
		throw error
	}
}

async function deployCommands() {
	//commandList = getCommands()
	//console.log(commandList)
	//console.log(commandList[3].options)
	//refreshGuildCommands(`645053287208452106`)
	return refreshGlobalCommands()
}

async function getCommands() {
	console.log("!!!")
	const commands = []
	// reads files from files directory
	const commandsPath = path.join(__dirname, '..', 'commands', 'slash')
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

	for (const file of commandFiles) {
		const command = require(`../commands/slash/${file}`)
		console.log(file)
		if (command.tempType === 'new') {
			commands.push(command.data)
			//console.log(command.data)
		} else {
			commands.push(command.data.toJSON())
			//console.log(command.data)
		}
	}
	//console.log(commands)
	return commands
}


async function getGuildCommands() {
	const commands = []

}

async function getContextMenuCommands() {
	console.log('context menu commands,,')
	const commands = []

	const commandsPath = path.join(__dirname, '..', 'commands', 'contextmenu')
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

	for (const file of commandFiles) {
		const command = require(`../commands/contextmenu/${file}`)
		console.log(file)
		console.log(command.data.name)
		commands.push(command.data.toJSON())
	}
	return commands
}


function typeResolver(string) {
	types = {
		"SUB_COMMAND": 1,
		"SUB_COMMAND_GROUP": 2,
		"STRING": 3,
		"INTEGER": 4,	//Any integer between - 2 ^ 53 and 2 ^ 53
		"BOOLEAN": 5,
		"USER": 6,
		"CHANNEL": 7,	//Includes all channel types + categories
		"ROLE": 8,
		"MENTIONABLE": 9,	//Includes users and roles
		"NUMBER": 10,	//Any double between - 2 ^ 53 and 2 ^ 53
		"ATTACHMENT": 11,	//attachment object
	}
	console.log(string.toUpperCase())
	type = types[string.toUpperCase()]
	return type
}


module.exports = {
	get() {
		return getCommands()
	},
	deploy() {
		return deployCommands()
	},
	refreshGuild(guildID) {
		refreshGuildCommands(guildID)
	},
	typeResolver(string) {
		typeResolver(string)
	},
	/**
	 *Runs a command, optionally with altered interaction group, subcommand, options
	 *
	 * @param {*} interaction 	command interaction
	 * @param {*} [commandName=interaction.commandName] 
	 * @param {string} group
	 * @param {string} subcommand
	 * @param {{name: string, type: number, value: *}[]} options
	 */
	async run(interaction, commandName = interaction.commandName, group, subcommand, options) {
		if (group) {
			console.log(`group = ${group}`)
			interaction.options._group = group
		}
		if (subcommand) {
			console.log(`subcommand = ${subcommand}`)
			interaction.options._subcommand = subcommand
		}
		if (options) {
			console.log("balls")

			// merge options with interaction's options, new options will overwrite 
			interaction.options._hoistedOptions = merge(interaction.options._hoistedOptions, options, "name")
			console.log("merged	")
			console.log(interaction.options._hoistedOptions)
		}

		console.log("commandName: " + commandName)
		const command = await interaction.client.commands.get(commandName)

		try {
			// handle discord permissions
			acceptedPermissions = []
			deniedPermissions = []
			permissionsText = `Permissions:`
			permlist = command.discordPermissions || []

			// for every permission set in the command, check it
			for (var i = 0; i < permlist.length; i++) {
				console.log(i)
				if (interaction.member.permissions.has(permlist[i])) {
					console.log("yes")
					acceptedPermissions.push(permlist[i])
				} else {
					console.log("no")
					deniedPermissions.push(permlist[i])
				}
			}
			for (var i = 0; i < deniedPermissions.length; i++) {
				permissionsText += `\n🚫  **${new PermissionsBitField(deniedPermissions[i]).toArray()}**` // get text name for each permission
			}
			for (var i = 0; i < acceptedPermissions.length; i++) {
				permissionsText += `\n✅  **${new PermissionsBitField(acceptedPermissions[i]).toArray()}**`
			}

			if (deniedPermissions.length > 0) {
				throw { name: `You don't have permission to perform this command\n${permissionsText}` }
			}

			if (command.permission == `botowner` && interaction.user.id != permissions[command.permission]) throw { name: `You don't have permission to perform this command\nRequired permission: *${command.permission}*` }

			console.log(interaction.options)
			console.log("running command")
			await command.execute(interaction) // trys to run the command
		} catch (error) {
			console.error(error)
			const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('errorreport')
						.setLabel('Report Error')
						.setStyle(ButtonStyle.Danger),
				)
			interaction.reply({ embeds: embeds.errorEmbed(`Running command **${interaction.commandName}**`, error), components: [row], ephemeral: true })

		}
	},
	async textToCommandParser(text = "") {
		// split text by spaces
		words = text.split(' ')
		for (let i = 0, len = words.length; i < len; i++) {
			console.log(words[i])
			switch (i) {
				case 0: {
					commandName = words[i]
					break
				}
				case 1: {

					break
				}
			}
		}



	},
}