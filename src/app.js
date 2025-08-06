// 📦 Importa o framework Express
const express = require('express');

// 🔐 Importa o CORS para permitir comunicação entre front e back
const cors = require('cors');

// 🚀 Cria a instância principal da aplicação
const app = express();

// 🧠 Middleware que permite ler JSON no corpo da requisição
app.use(express.json());

// 🌍 Configuração do CORS (deixe como está, está perfeito)
app.use(cors({
  origin: 'http://localhost:3001', // Libera acesso do seu front
  credentials: true                // Permite cookies (se quiser usar login com sessão)
}));

// 🔐 Rotas de autenticação (login, cadastro)
const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes); // Ex: POST /auth/login

// 👤 Rotas de usuário (CRUD completo)
const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes); // Ex: GET /users

// ✅ Rota raiz para teste rápido no navegador
app.get('/', (req, res) => {
  res.send('API do AumigoStay está no ar 🔥');
});

// 📦 Exporta a aplicação para ser usada no server.js
module.exports = app;
