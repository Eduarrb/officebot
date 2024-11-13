import { body, validationResult } from 'express-validator';
import { Usuarios, Consultas, Respuestas } from '../models/index.js';

const formRegister = async (req, res) => {
    res.render('auth/register', {
        title: 'Registro'
    })
}

export {
    formRegister
}