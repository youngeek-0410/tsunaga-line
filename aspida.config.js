module.exports = {
  input: 'src/api', // "input" of aspida is "output" for openapi2aspida
  openapi: { inputFile: 'backend/docs/openapi.json' },
  trailingSlash: true,
};
