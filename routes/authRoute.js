import express from 'express';

import { formRegister, registrarUsuario } from '../controllers/registerController.js';
import { formLogin, autenticar } from '../controllers/loginController.js';

const router = express.Router();

router.get('/register', formRegister);
router.post('/register', registrarUsuario);

router.get('/login', formLogin);
router.post('/login', autenticar);

export default router;