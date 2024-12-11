import express from 'express';

import { formRegister, registrarUsuario } from '../controllers/registerController.js';
import { formLogin, autenticar, logout } from '../controllers/loginController.js';

const router = express.Router();

router.get('/register', formRegister);
router.post('/register', registrarUsuario);

router.get('/login', formLogin);
router.post('/login', autenticar);

router.get('/logout', logout);

export default router;