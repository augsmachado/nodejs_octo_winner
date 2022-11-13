const express = require("express");

const StatusCtrl = require("../controllers/status.controllers.js");

const router = express.Router();

router.route("/server").get(StatusCtrl.getStatusServer);

module.exports = router;