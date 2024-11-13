import express from "express";

import {index} from '../controllers/landingController.js';

const router = express.Router();

router.get('/', index);

export default router;