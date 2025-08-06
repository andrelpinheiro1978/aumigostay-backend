// Importa a biblioteca JWT para verificar o token
const jwt = require('jsonwebtoken');

// Middleware de autenticação
function authenticateToken(req, res, next) {
  // Pega o token do cabeçalho da requisição (Authorization: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Divide para pegar só o token

  // Se não houver token, retorna 401 (Não autorizado)
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    // Verifica o token com a mesma chave secreta usada para gerar
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Armazena o usuário decodificado na requisição (req.user) para usar depois
    req.user = decoded;

    // Continua para a próxima função ou rota
    next();
  } catch (err) {
    // Se o token for inválido ou expirado
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = authenticateToken;
