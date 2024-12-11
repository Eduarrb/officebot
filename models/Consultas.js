import { DataTypes } from "sequelize";

import db from "../config/db.js";

const Consultas = db.define('consultas', {
    usuarioId: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    consulta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaConsulta: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    horaConsulta: {
        type: DataTypes.TIME,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});

export default Consultas;