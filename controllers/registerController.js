import { body, validationResult } from "express-validator";
import { Usuarios, Consultas, Respuestas } from "../models/index.js";

const formRegister = async (req, res) => {
    res.render("auth/register", {
        title: "Registro",
        csrfToken: req.csrfToken(),
        errores: "",
        usuario: "",
    });
};

const registrarUsuario = async (req, res) => {
    await body("username").notEmpty().withMessage("El campo nombre de usuario no debe estar vacio").run(req);
    await body("email").isEmail().withMessage("el campo email no debe estar vacio").run(req);
    await body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener mínimo 8 caracteres").run(req);
    await body("confirmPassword").equals(req.body.password).withMessage("Las contraseñas deben coincidir").run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
        let errores = resultado.array().reduce((obj, item) => ((obj[item.path] = item.msg), obj), {});
        return res.render("auth/register", {
            title: "Registro",
            csrfToken: req.csrfToken(),
            errores,
            usuario: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
        });
    }

    const existeUsuario = await Usuarios.findOne({
        where: {
            email: req.body.email
        }
    });

    if(existeUsuario) {
        return res.render("auth/register", {
            title: "Registro",
            csrfToken: req.csrfToken(),
            errores: {
                email: "Este correo ya esta registrado"
            },
            usuario: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
        });
    }

    const { username, email, password } = req.body;
    const msj = "Registro satisfactorio, por favor inicia sesión";
    const activate = 1;
    await Usuarios.create({
        username,
        email,
        password,
        activate
    })
    res.redirect('/auth/login');
};

export { formRegister, registrarUsuario };
