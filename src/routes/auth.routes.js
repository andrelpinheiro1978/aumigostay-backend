// Importa o Express para criar o roteador
const express = require('express');

// Cria um novo roteador Express para definir as rotas de autenticação
const router = express.Router();

// Importa o controller de autenticação, que tem as funções register e login
const authController = require('../controllers/auth.controller');

// Importa o middleware de autenticação
const authenticateToken = require('../middlewares/auth.middleware');

// Rota POST para cadastrar um novo usuário
// Exemplo: POST http://localhost:3000/auth/register
router.post('/register', authController.register);

// Rota POST para autenticar um usuário e gerar token JWT
// Exemplo: POST http://localhost:3000/auth/login
router.post('/login', authController.login);

// Rota protegida de teste
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Bem-vindo, ${req.user.name}! Essa é uma rota protegida.` });
});

// Exporta o roteador para ser usado no app principal
module.exports = router;
