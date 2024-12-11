import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Respuestas = db.define('respuestas', {
    usuarioId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    consultaId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    respuesta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaRespuesta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    horaRespuesta: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

export default Respuestas;