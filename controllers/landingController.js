import { Consultas, Respuestas } from "../models/index.js";


const index = async (req, res) => {
    const consultasRespuestas = await Respuestas.findAll({
        where: {
            usuarioId: req.usuario.id
        },
        include: [{
            model: Consultas
        }]
    })

    console.log(consultasRespuestas);

    res.render('landing/index', {
        title: 'OfficeBot',
        csrfToken: req.csrfToken(),
        consultasRespuestas
    })
}

export {index};
