import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Respuestas = db.define('respuestas', {
    usuarioId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    respuesta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaRespuesta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    horaRespuesta: {
        type: DataTypes.TIME,
        allowNull: false
    }
});

export default Respuestas;