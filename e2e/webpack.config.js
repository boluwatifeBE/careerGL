const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@functions': path.resolve(__dirname, './cypress/integration/functions/'),
      '@fixtures': path.resolve(__dirname, './cypress/fixtures/'),
      '@components': path.resolve(__dirname, '../components/'),
    },
  },
};
