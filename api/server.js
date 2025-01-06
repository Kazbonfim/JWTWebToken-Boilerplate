const app = require('../app');
const http = require('http');

module.exports = (req, res) => {
    // Criar o servidor HTTP e passar a requisição para o Express
    const server = http.createServer(app);

    
    // Redireciona a requisição para o Express
    server.emit('request', req, res);
};