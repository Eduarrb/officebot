import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const Usuarios = db.define(
    'usuarios',
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        activate:{
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 0
        },
        token: DataTypes.STRING,
        fechaRegistro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        hooks: {
            beforeCreate: async function (usuario) {
                const salt = await bcrypt.genSalt(10);
                usuario.password = await bcrypt.hash(usuario.password, salt);
            },
        },
        scopes: {
            excluirCampos: {
                attributes: {
                    exclude: ['password', 'token', 'status']
                }
            }
        }
    }
);

Usuarios.prototype.verificarPassword = function (pass){
    return bcrypt.compareSync(pass, this.password);
}

export default Usuarios;