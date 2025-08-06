// Importa o PrismaClient para conectar ao banco de dados
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Importa o bcrypt para hashear a senha
const bcrypt = require('bcrypt');

// Cria um novo usuário no banco
async function createUser(data) {
  // Gera o hash da senha antes de salvar
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Substitui a senha original pela senha hasheada
  const userData = {
    ...data,
    password: hashedPassword
  };
  return await prisma.user.create({ data: userData });
}

// Lista todos os usuários cadastrados
async function findAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      address: true,
      createdAt: true
    }
  });
}

// Busca um usuário pelo ID
async function findUserById(id) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      address: true,
      createdAt: true
    }
  });
}

// Atualiza um usuário existente pelo ID
async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data
  });
}

// Remove um usuário pelo ID
async function deleteUser(id) {
  return await prisma.user.delete({ where: { id: parseInt(id) } });
}

// Exporta todas as funções para uso em outras camadas
module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser
};