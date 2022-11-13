const dotenv = require("dotenv");
const axios = require("axios");
const cheerio = require("cheerio");

const { v4: uuidv4 } = require("uuid");

// Define .env config
dotenv.config();

class AmazonController {
	static async getAmazonStatus(req, res) {
		try {
			let status = {
				msg: "Current API status",
				name: "Amazon Scraper API",
				environment: process.env.API_ENVIRONMENT,
				version: process.env.API_VERSION,
				uptime: new Date().getTime(),
				hash: uuidv4(),
			};

			res.json(status);
		} catch (err) {
			res.status(500).json({
				error: "Unable to get Amazon API status",
				details: `${err}`,
			});
		}
	}

	static async getAmazonTodayDeals(req, res) {
		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === process.env.AMAZON_API_KEY) {
			try {
				res.json({
					msg: "ok",
				});
			} catch (err) {
				res.status(500).json({
					error: "Unable to get today's deals from Amazon",
					details: `${err}`,
				});
			}
		} else {
			res.status(403).json({
				error: "Forbidden",
				details: "Invalid API Key",
			});
		}
	}
}

module.exports = AmazonController;
