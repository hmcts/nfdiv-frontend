import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Application } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const webpackDevModuleDir = path.dirname(fileURLToPath(import.meta.url));

export class WebpackDev {
  public enableFor(app: Application): void {
    if (app.locals.developmentMode) {
      const webpackConfigPath = path.resolve(webpackDevModuleDir, '..', '..', '..', '..', 'webpack.config.cjs');
      if (!fs.existsSync(webpackConfigPath)) {
        return;
      }

      const requireFromModule = createRequire(import.meta.url);
      const webpackConfig = requireFromModule(webpackConfigPath);
      const compiler = webpack(webpackConfig);
      app.use(webpackDevMiddleware(compiler, { publicPath: 'src/main/public/' }));
    }
  }
}
