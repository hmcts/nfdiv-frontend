require('ts-node').register({
  project: 'src/test/tsconfig.codecept.json',
  experimentalResolver: true,
  preferTsExts: true,
  moduleTypes: {
    '**/*.ts': 'cjs',
  },
});

module.exports = require('./codecept.conf.ts');
