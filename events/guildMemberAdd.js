
// Emitted whenever a user joins a guild.

module.exports = {
	name: "guildMemberAdd",
	async execute(member) {

		console.log(`${member.id} has joined guild ${member.guild}`)
	},
}