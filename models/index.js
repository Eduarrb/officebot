import Usuarios from "./Usuarios.js";
import Consultas from "./Consultas.js";
import Respuestas from "./Respuestas.js";

Consultas.belongsTo(Usuarios, {
    foreignKey: 'usuarioId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

Respuestas.belongsTo(Usuarios, {
    foreignKey: 'usuarioId',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

export {
    Usuarios,
    Consultas,
    Respuestas
}