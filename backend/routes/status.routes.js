import express from "express";
import StatusCtrl from "../controllers/status.controllers.js";

const router = express.Router();

router.route("/").get(StatusCtrl.getStatusApi);

export default router;
