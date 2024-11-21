import { body, validationResult } from "express-validator";
import { Usuarios, Consultas, Respuestas } from "../models/index.js";

const formLogin = async (req, res) => {
    res.render("auth/login", {
        title: "Registro",
    });
};

export { formLogin };
