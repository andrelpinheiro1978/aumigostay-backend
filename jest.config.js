module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",          // Inclui todos os JS da pasta src
    "!src/**/index.js",     // Exclui arquivos index.js se quiser
    "!src/**/server.js",    // Exclui arquivos de boot
  ],
  coverageDirectory: "coverage"
};