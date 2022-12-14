// TODO: backport new database.js to lilysbot etc

const redis = require("redis")
const key = "ctjambot"


async function connect() {
	console.log("connecting to database...")
	process.db = redis.createClient({ url: "redis://localhost:6379" })
	process.db.on("error", async (err) => {
		console.log(`Redis error: ${err}`)
	})
	await process.db.connect()
	// console.log((await db.json.get(`test`)))

}


async function check(path) {

}





module.exports = {
	async connect() {
		connect()
	},
	/**
	 * Set data in the redis database
	 *
	 * @param {string} path The path to the data in JSON Path format (start with .)
	 * @param {*} data The data to be stored
	 */
	async set(path, data) {
		console.log(`path = ${path}`)

		// try and set the data, if it cannot be set (ie if )
		try {
			await process.db.json.set(key, path, data)
			//console.log(`check success: ${path}`)
		}
		catch (e) {
			console.log(e)
		}


	},
	/**
	 * Get data from the redis database
	 *
	 * @param {string} path The path to the data in JSON Path format (start with .)
	 * @return {*} Returns data from the path
	 */
	async get(path) {
		console.log(`get path: ${path}`)
		return await process.db.json.get(key, { path: path })
	},
	/**
	 * Delete data from the redis database
	 *
	 * @param {string} path The path to the data in JSON Path format (start with .)
	 */
	async del(path) {
		// console.log(`path: ${path}`)
		try {
			await process.db.json.del(key, path)
		}
		catch (e) {
			console.log(e)
			throw new Error(`Could not delete ${key}: $.${path}.\n${e}`)
		}
	},


}