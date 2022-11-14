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

	// TO DO: this function is not correct
	static async getAmazonTodayDeals(req, res) {
		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		if (api_key === process.env.AMAZON_API_KEY) {
			try {
				const link = `${process.env.AMAZON_BASE_URL}/gp/goldbox?ref_=nav_cs_gb`;

				axios(link).then((response) => {
					const html = response.data;
					const $ = cheerio.load(html);
					const products = $(
						"div.Grid-module__gridDisplayGrid_2X7cDTY7pjoTwwvSRQbt9Y"
					);

					let deals = [];

					products.each((index, element) => {
						const product_name = $(element)
							.find("a.a-link-normal")
							.attr("href");

						deals.push({
							name: product_name,
						});
					});

					res.json({ msg: "success", deals: deals });
				});
			} catch (err) {
				res.status(500).json({
					error: "Unable to get today's deals from Amazon",
					details: err,
				});
			}
		} else {
			res.status(403).json({
				error: "Forbidden",
				details: "Invalid API Key",
			});
		}
	}

	static async getProducts(req, res) {
		const headers = req.headers["x-api-key"];
		const api_key = Buffer.from(headers, "base64").toString();

		const product_name =
			req.query.product_name !== undefined
				? req.query.product_name
				: "kindle";

		// Test if page exists and it is a number
		const page =
			1 || req.query.page.length > 0
				? /[0-9]/g.test(req.query.page)
					? Number(req.query.page)
					: 1
				: 1;

		if (api_key === process.env.AMAZON_API_KEY) {
			const link = `${process.env.AMAZON_BASE_URL}/s?k=${product_name}&page=${page}`;
			axios
				.get(link)
				.then((response) => {
					const html = response.data;
					const $ = cheerio.load(html);
					const results = $(
						//"div.s-main-slot.s-result-list.s-search-results.sg-row"
						"div.sg-col-inner"
					);

					let products = [];
					results.each((index, element) => {
						const product_description = $(element)
							.find(
								"span.a-size-base-plus.a-color-base.a-text-normal"
							)
							.text()
							.trim();

						const price = $(element)
							.find("span.a-price > span.a-offscreen")
							.text()
							.trim();

						const availability = $(element)
							.find(
								"div.a-row.a-size-base.a-color-secondary > span"
							)
							.attr("aria-label");

						const shipping = $(element)
							.find(
								"div.a-row.a-size-base.a-color-secondary.s-align-children-center > span.a-size-small.a-color-base.puis-light-weight-text"
							)
							.text()
							.trim();

						const thumbnail = $(element)
							.find("img.s-image")
							.attr("src");

						const more_choices = $(element)
							.find(
								"a.a-link-normal.puis-light-weight-text.s-link-style.s-underline-text.s-underline-link-text.s-link-centralized-style"
							)
							.attr("href");

						const product_link = $(element)
							.find("a.a-link-normal.s-no-outline")
							.attr("href");

						let aux = process.env.AMAZON_BASE_URL.toString();

						products.push({
							description: product_description,
							price: price,
							availability: availability,
							shipping: shipping,
							link: aux.concat("", product_link),
							thumbnail: thumbnail,
							more_choices:
								more_choices != undefined
									? more_choices
									: "not available",
						});
					});

					// Remove products without essential attributes
					for (var i = 0; i < products.length; i++) {
						if (
							products[i].description.length <= 0 ||
							products[i].price.length <= 0
						) {
							products.splice(i, 1);
							i--;
						}
					}

					const p = products.shift();
					res.json({
						size: products.length,
						search: products,
					});
				})
				.catch((err) => {
					res.status(500).json({
						error: "Unable to search product on Amazon",
						details: err,
					});
				});
		} else {
			res.status(403).json({
				error: "Forbidden",
				details: "Invalid API Key",
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
					details: err,
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

module.exports = AmazonController;
