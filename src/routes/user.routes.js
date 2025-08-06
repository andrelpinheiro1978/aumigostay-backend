const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

// Rota POST para criar novo usuário
router.post('/', controller.create);

// Rota GET para listar todos os usuários
router.get('/', controller.list);

// Rota GET para buscar um usuário específico por ID
router.get('/:id', controller.findById);

// Rota PUT para atualizar os dados de um usuário por ID
router.put('/:id', controller.update);

// Rota DELETE para remover um usuário por ID
router.delete('/:id', controller.remove);

module.exports = router;
