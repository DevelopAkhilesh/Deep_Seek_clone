import express from "express";
import { sendPrompt } from "../controller/promt.controller.js";

const router = express.Router();

router.post("/promt", sendPrompt)

export default router