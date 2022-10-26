const path = require('path');

const packageJson = path.resolve(__dirname, '../node_modules/hmrc-frontend/package.json');
const root = path.resolve(packageJson, '..', 'hmrc');

module.exports = {
  paths: { template: root },
};
