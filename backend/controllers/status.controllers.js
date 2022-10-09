import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import dotenv from "dotenv";

// Define .env config
dotenv.config();

export default class StatusController {
	static async getStatusApi(req, res) {
		try {
			let response = {
				msg: "Current API status",
				name: process.env.API_NAME,
				enviroment: process.env.ENVIROMENT,
				version: process.env.API_VERSION,
				uptime: new Date().getTime(),
				hash: uuidv4(),
			};

			res.json(response);
		} catch (err) {
			res.status(500).json({
				error: "Unable to getting API status",
				details: `${err}`,
			});
		}
	}
}
