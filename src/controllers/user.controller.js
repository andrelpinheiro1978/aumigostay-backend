// Importa o service que faz acesso ao banco de dados
const service = require('../services/user.service');

// Cria um novo usuário e retorna status 201
async function create(req, res) {
  try {
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: err.message });
  }
}

// Lista todos os usuários
async function list(req, res) {
  const users = await service.findAllUsers();
  res.json(users);
}

// Busca um usuário por ID
async function findById(req, res) {
  const user = await service.findUserById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ error: 'Usuário não encontrado' });
}

// Atualiza os dados de um usuário
async function update(req, res) {
  try {
    const user = await service.updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: err.message });
  }
}

// Remove um usuário pelo ID
async function remove(req, res) {
  try {
    await service.deleteUser(req.params.id);
    res.status(204).send(); // sucesso sem conteúdo
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: err.message });
  }
}

// Exporta os métodos para serem usados nas rotas
module.exports = {
  create,
  list,
  findById,
  update,
  remove
};
