const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const packageJson = path.resolve(__dirname, '../node_modules/govuk-frontend/package.json');
const root = path.resolve(packageJson, '..', 'dist', 'govuk');
const sass = path.resolve(root, 'all.scss');
const javascript = path.resolve(root, 'all.js');
const components = path.resolve(root, 'components');
const assets = path.resolve(root, 'assets');
const images = path.resolve(assets, 'images');
const fonts = path.resolve(assets, 'fonts');

const rebrandAssets = path.resolve(root, 'assets', 'rebrand');
const rebrandImages = path.resolve(rebrandAssets, 'images');

const copyGovukTemplateAssets = new CopyWebpackPlugin({
  patterns: [
    { from: images, to: 'assets/images' },
    { from: fonts, to: 'assets/fonts' },
    { from: `${assets}/manifest.json`, to: 'assets/manifest.json' },
    { from: rebrandImages, to: 'assets/rebrand/images' },
    { from: `${rebrandAssets}/manifest.json`, to: 'assets/rebrand/manifest.json' }
  ],
});

module.exports = {
  paths: { template: root, components, sass, javascript, assets },
  plugins: [copyGovukTemplateAssets],
};
