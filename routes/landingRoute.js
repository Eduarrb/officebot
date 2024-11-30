import express from "express";

import { protegerRuta } from "../middlewares/validaciones.js";

import {index} from '../controllers/landingController.js';

const router = express.Router();

router.get('/', protegerRuta, index);

export default router;