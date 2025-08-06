// Importa o framework Express
const express = require('express');

// Importa o CORS
const cors = require('cors');

// Cria a instância principal da aplicação
const app = express();

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json());

// ⚠️ Ajuste do CORS: permite acesso do frontend na porta 3001
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true // Permite cookies e autenticações (futuramente)
}));

// Importa as rotas de autenticação (login e cadastro)
const authRoutes = require('./routes/auth.routes');

// Define o prefixo "/auth" para as rotas de autenticação
app.use('/auth', authRoutes);

// Rota raiz apenas para teste rápido da API
app.get('/', (req, res) => {
  res.send('API do AumigoStay está no ar 🐶');
});

// Exporta a aplicação configurada para ser usada no server.js
module.exports = app;