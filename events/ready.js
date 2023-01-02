const database = require("../structure/database")

module.exports = {
	name: 'ready',
	// should the event only run once?
	once: true,
	// event logic, which will be called by the event handler whenever the event emits.
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`)
		// connect to the database
		database.connect()
	},
}