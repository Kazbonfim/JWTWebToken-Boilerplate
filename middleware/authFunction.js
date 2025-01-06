const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function verifyJWT(req, res, next) {
    // Aqui nós verificamos se, existe um Token nos Cookies
    const token = req.cookies.token;

    console.log(`Token recebido: ${token}`); //Debug

    if (!token) {
        return res.status(401).json({ auth: false, message: 'No Token provided' });
    }

    // Verifica e valida o token JWT
    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id; // Atribuindo o ID do usuário decodificado para o req
        next();
    });
}

module.exports = verifyJWT;