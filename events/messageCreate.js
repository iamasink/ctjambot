

module.exports = {
	name: "messageCreate",
	async execute(message) {
		console.log(`a message was created: ${message} by ${message.author} in ${message.guild}`)
		//console.log(message)
		// add xp
		//path = `$.${message.guild.id.toString()}.user.${message.author.id}.xp`
	},
}