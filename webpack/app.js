const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const root = path.resolve(__dirname, './../../');
const sass = path.resolve(root, './main/assets/scss');
const images = path.resolve(__dirname, '../src/main/assets/images');
const locales = path.resolve(__dirname, '../src/main/assets/locales');
const pdfWorker = path.resolve(__dirname, '../node_modules/pdfjs-dist/build/pdf.worker.js');

const copyImages = new CopyWebpackPlugin({
  patterns: [{ from: images, to: 'img' }],
});

const copyLocales = new CopyWebpackPlugin({
  patterns: [{ from: locales, to: 'assets/locales' }],
});

const copyPdfWorker = new CopyWebpackPlugin({
  patterns: [{ from: pdfWorker, to: 'assets/pdf' }],
});

module.exports = {
  paths: { root, sass },
  plugins: [copyImages, copyLocales, copyPdfWorker],
};
