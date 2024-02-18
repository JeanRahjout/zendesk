const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, '../backend/public'),
  devServer: {
    proxy: {
      '/api': {
        target: 'http://0.0.0.0'
      }
    }
  }
},
defineConfig({
  transpileDependencies: true
});