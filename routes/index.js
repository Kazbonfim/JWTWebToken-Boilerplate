var express = require('express');
var router = express.Router();
const authFunction = require('../middleware/authFunction');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/user', authFunction, (req, res, next) => {
  console.log('Autenticação bem sucedida!');
  res.render('dashboard');
  // res.status(200).json({message: 'Deu certo'});
});

router.post('/login', (req, res, next) => {
  // Esse teste deve ser feito no db, por ex.
  if (req.body.user && req.body.password) {
    // Auth OK
    const id = 1; // Esse ID viria do banco de dados
    const token = jwt.sign({ id }, secret, {
      expiresIn: 300 // Durará 05 minutos
    })

    res.cookie('token', data.token, { httpOnly: true, secure: true });
    res.redirect('/user');
    // return res.json({ auth: true, token: token });
  }
});

router.post('/logout', (req, res, next) => {
  res.json({ auth: false, token: null });
})

module.exports = router;