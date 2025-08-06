function validaSenha(senha) {
  return typeof senha === 'string' && senha.length >= 8;
}

module.exports = {
  validaSenha
};
