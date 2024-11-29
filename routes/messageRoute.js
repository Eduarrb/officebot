import express from "express";

import { postMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post('/message', postMessage);

export default router;