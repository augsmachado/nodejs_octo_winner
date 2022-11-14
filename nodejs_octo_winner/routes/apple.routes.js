const express = require("express");

const AppleCtrl = require("../controllers/apple.controllers.js");

const router = express.Router();

router.route("/status").get(AppleCtrl.getAppleStatus);

module.exports = router;
