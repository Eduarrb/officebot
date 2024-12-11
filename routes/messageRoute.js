import express from "express";

import { postMessage } from "../controllers/messageController.js";
import { protegerRuta } from "../middlewares/validaciones.js";


const router = express.Router();

router.post('/message', protegerRuta, postMessage);

export default router;