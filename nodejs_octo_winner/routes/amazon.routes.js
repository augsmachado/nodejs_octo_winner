const express = require("express");

const AmazonCtrl = require("../controllers/amazon.controllers.js");

const router = express.Router();

router.route("/status").get(AmazonCtrl.getAmazonStatus);
router.route("/today").get(AmazonCtrl.getAmazonTodayDeals);

module.exports = router;
