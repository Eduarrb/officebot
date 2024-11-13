import express from 'express';

import { formRegister } from '../controllers/registerController.js'

const router = express.Router();

router.get('/register', formRegister);

export default router;