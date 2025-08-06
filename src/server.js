// Importa o módulo app.js que contem as configuraçoes do servidor Express (Rotas, middlewares, etc)
const app = require('./app');

require('dotenv').config(); // Carrega as variáveis do .env

const PORT = process.env.PORT || 3000; // Usa a porta 3000 como padrão ou alguma que eu definir

// Inicia o servidor e imprime a mensagem no console.
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});