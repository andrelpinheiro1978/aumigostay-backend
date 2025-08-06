// Importa o Prisma Client, que é nosso ORM para acessar o banco de dados PostgreSQL
const { PrismaClient } = require('@prisma/client');

// Cria uma instância do Prisma para executar queries (inserir, buscar, etc.)
const prisma = new PrismaClient();

// Importa o bcrypt para criptografar senhas e compará-las com segurança
const bcrypt = require('bcrypt');

// Importa a função que gera o token JWT, usada após cadastro ou login
const { generateToken } = require('../utils/jwt');

// Função assíncrona para registrar um novo usuário
async function register(data) {
    // Criptografa a senha do usuário com 10 rounds de segurança
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Cria o novo usuário no banco de dados usando os dados recebidos e a senha já criptografada
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,           // Pode ser TUTOR ou SITTER (enum)
            address: data.address      // Endereço textual (mais tarde podemos usar lat/lng)
        }
    });

    // Gera o token JWT com os dados do usuário (essa linha está incompleta!)
    const token = generateToken({ id: user.id, role: user.role }); // ← você precisa passar { id: user.id, role: user.role } aqui
  return { user, token }; // ESSENCIAL!!! 
}

// Função assíncrona para autenticar um usuário com email e senha
async function login(email, password) {
  const user = await prisma.user.findUnique({ where: { email } });

  // 1️⃣ Verifica se o usuário existe
  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  // 2️⃣ Verifica se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Senha inválida');
  }

  // 3️⃣ Se tudo der certo, gera o token
  const token = generateToken({ id: user.id, role: user.role });

  // 4️⃣ Retorna o usuário e o token
  return { user, token };
}

module.exports = {
  register,
  login
};
