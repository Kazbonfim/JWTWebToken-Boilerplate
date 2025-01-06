const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function verifyJWT(req, res, next) {
    // 'Authorization' deve ser minúsculo
    // const token = req.headers['authorization']; 
    const token = req.cookies.token;

    console.log(`Token recebido: ${token}`);
    
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No Token provided' });
    }

    // A token geralmente vem no formato "Bearer <token>", então fazemos esse ajuste
    const tokenWithoutBearer = token.split(' ')[1]; // Captura apenas o token sem o "Bearer"

    if (!tokenWithoutBearer) {
        return res.status(401).json({ auth: false, message: 'Token mal formatado' });
    }

    jwt.verify(tokenWithoutBearer, secret, (error, decoded) => {
        if (error) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id; // Atribuindo o ID do usuário decodificado para o req
        next();
    });
}

module.exports = verifyJWT;
