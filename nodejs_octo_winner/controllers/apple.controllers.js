const dotenv = require("dotenv");
const axios = require("axios");
const cheerio = require("cheerio");

const { v4: uuidv4 } = require("uuid");

// Define .env config
dotenv.config();

class AppleController {
	static async getAppleStatus(req, res) {
		try {
			let status = {
				msg: "Current API status",
				name: "Apple Scraper API",
				environment: process.env.API_ENVIRONMENT,
				version: process.env.API_VERSION,
				uptime: new Date().getTime(),
				hash: uuidv4(),
			};

			res.json(status);
		} catch (err) {
			res.status(500).json({
				error: "Unable to get Apple API status",
				details: `${err}`,
			});
		}
	}

	/*
	static async getAmazonTodayDeals(req, res) {
		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === process.env.AMAZON_API_KEY) {
			try {
				const link = `${process.env.AMAZON_BASE_URL}/gp/goldbox?ref_=nav_cs_gb`;

				axios
					.get(link)
					.then((response) => res.json({ msg: "success" }));
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
	*/
}

module.exports = AppleController;
