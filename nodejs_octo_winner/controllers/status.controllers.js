const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

// Define .env config
dotenv.config();

class StatusController {
	static async getStatusServer(req, res) {
		try {
			let response = {
				msg: "Current server status",
				version: process.env.SERVER_VERSION,
				uptime: new Date().getTime(),
				hash: uuidv4(),
			};

			res.json(response);
		} catch (err) {
			res.status(503).json({
				error: "Unable to getting server status",
				details: `${err}`,
			});
		}
	}
}

module.exports = StatusController;
