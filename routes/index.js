var express = require('express');
var router = express.Router();
const authFunction = require('../middleware/authFunction');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const userData = {
  username: "johndoe",
  email: "johndoe@example.com",
  name: "John Doe",
  role: "admin",
  lastLogin: "2025-01-05T15:30:00"
};


router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/user', authFunction, (req, res, next) => {
  // Em caso de sucesso, só exibir os dados mesmo
  console.log('Autenticação bem sucedida!');
  res.render('dashboard', { userData });
});

router.post('/login', (req, res, next) => {
  // Aqui poderíamos fazer a validação dos dados do usuário cadastrado no DB
  // Em seguida, 'assinamos' esses dados
  if (req.body.user && req.body.password) {
    const id = 1;
    const token = jwt.sign({ id }, secret, {
      expiresIn: 300
    })

    // Aqui, salvamos a assinatura direto no Cookie, pela simplicidade
    res.cookie('token', token, { httpOnly: true, secure: true });
    // Redirecionamos pra rota com proteção...
    res.redirect('/user');
  }
});

router.post('/logout', (req, res, next) => {
  // Aqui excluímos os dados salvos no Cookie durante o login
  // Pra pôr simplicidade, vou apenas jogar o usuário de volta no '/'
  res.clearCookie('token');
  res.redirect('/')
})

router.get('/teste', (req, res, next) => {
  // Rota de teste, nada demais
  res.render('teste');
});

module.exports = router;