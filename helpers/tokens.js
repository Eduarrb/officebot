import jwt from 'jsonwebtoken';

const generarJWT = datos => {
    return jwt.sign(
        {
            id: datos.id,
            username: datos.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
    )
}


const generarId = () =>
    Math.random().toString(32).substring(2) + Date.now().toString(32);

export { generarId, generarJWT };
