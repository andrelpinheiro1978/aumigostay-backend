// Importando o serivce de autenticação
const authService = require('../services/auth.service');

// Função assíncrona que trata o cadastro de um novo usuário via rota POST /auth/register
async function register(req, res) {
  try {
    // Desestrutura o retorno da função register do service, passando os dados do body da requisição
    const { user, token } = await authService.register(req.body);

    // Retorna status 201 (Criado) com os dados do usuário e o token JWT
    res.status(201).json({ user, token });

  } catch (err) {
    // Se houver qualquer erro (ex: e-mail duplicado, campos ausentes), retorna status 400 (Bad Request)
    res.status(400).json({ error: err.message });
  }
}

// Função assíncrona que trata a autenticação do usuário via POST /auth/login
async function login(req, res) {
  try {
    // Chama o service de login passando email e senha recebidos no corpo da requisição
    const { user, token } = await authService.login(req.body.email, req.body.password);

    // Se o login for bem-sucedido, retorna status 200 (OK) com o usuário e o token
    res.status(200).json({ user, token });

  } catch (err) {
    // Se o usuário não existir ou a senha estiver errada, retorna 401 (Não autorizado)
    res.status(401).json({ error: err.message });
  }
}

// ...suas funções acima...

module.exports = {
  register,
  login
};