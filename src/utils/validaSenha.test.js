const { validaSenha } = require('./validaSenha');

describe('validaSenha()', () => {
  test('deve retornar true para senha com 8 ou mais caracteres', () => {
    expect(validaSenha('12345678')).toBe(true);
  });

  test('deve retornar false para senha com menos de 8 caracteres', () => {
    expect(validaSenha('123')).toBe(false);
  });

  test('deve retornar false se a senha não for string', () => {
    expect(validaSenha(null)).toBe(false);
    expect(validaSenha(undefined)).toBe(false);
    expect(validaSenha(12345678)).toBe(false);
  });
});