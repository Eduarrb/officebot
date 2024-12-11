import { body, validationResult } from "express-validator";
import { Usuarios } from "../models/index.js";
import { generarJWT } from "../helpers/tokens.js";

const formLogin = (req, res) => {
    res.render("auth/login", {
        title: "Login",
        csrfToken: req.csrfToken(),
        errores: '',
        usuario: '',
    });
};

const autenticar = async (req, res) => {
    await body('email').isEmail().withMessage('Debe ser un correo válido').run(req)
    await body('password').notEmpty().withMessage('Debes ingresar una contraseña').run(req);

    let resultado = validationResult(req);
    if (!resultado.isEmpty()) {
        let errores = resultado.array().reduce((obj, item) => ((obj[item.path] = item.msg), obj), {});
        console.log(errores);
        return res.render("auth/login", {
            title: "Login",
            csrfToken: req.csrfToken(),
            errores,
            usuario: {
                email: req.body.email,
            },
        });
    }

    const { email, password } = req.body;
    const usuarioLogin = await Usuarios.findOne({
        where: {
            email
        }
    })
    if(!usuarioLogin) {
        return res.render("auth/login", {
            title: "Login",
            csrfToken: req.csrfToken(),
            errores: {
                email: 'no existe ningun usuario con ese correo'
            },
            usuario: {
                email: req.body.email,
            },
        });
    }

    if(!usuarioLogin.verificarPassword(password)) {
        return res.render("auth/login", {
            title: "Login",
            csrfToken: req.csrfToken(),
            errores: {
                password: 'El pasword no es correcto'
            },
            usuario: {
                email: req.body.email,
            },
        });
    }

    const token = generarJWT({
        id: usuarioLogin.id,
        username: usuarioLogin.username
    });

    return res.cookie('_token', token, {
        httpOnly: true
    }).redirect('/');

}

const logout = (req, res) => {
    res.clearCookie('_token').redirect('/');
}

export { formLogin, autenticar, logout};
