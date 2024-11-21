import express from 'express';

import { formRegister } from '../controllers/registerController.js';
import { formLogin } from '../controllers/loginController.js';

const router = express.Router();

router.get('/register', formRegister);
router.get('/login', formLogin);

export default router;