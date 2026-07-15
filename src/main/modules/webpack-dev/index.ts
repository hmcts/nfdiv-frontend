import { createRequire } from 'module';
import path from 'path';

import { Application } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';

const requireFromRoot = createRequire(path.resolve(process.cwd(), 'package.json'));
const webpackConfig = requireFromRoot('../../../../webpack.config.cjs');

export class WebpackDev {
  public enableFor(app: Application): void {
    if (app.locals.developmentMode) {
      const compiler = webpack(webpackConfig);
      app.use(webpackDevMiddleware(compiler, { publicPath: 'src/main/public/' }));
    }
  }
}
