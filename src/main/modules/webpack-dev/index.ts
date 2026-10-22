import { createRequire } from 'module';

import { Application } from 'express';

const requireInDevOnly = createRequire(__filename);

export class WebpackDev {
  public enableFor(app: Application): void {
    if (app.locals.developmentMode) {
      const webpackDev = requireInDevOnly('webpack-dev-middleware') as typeof import('webpack-dev-middleware');
      const webpack = requireInDevOnly('webpack') as typeof import('webpack');
      const webpackconfig = requireInDevOnly(
        '../../../../webpack.config'
      ) as typeof import('../../../../webpack.config');
      const compiler = webpack(webpackconfig);
      app.use(webpackDev(compiler, { publicPath: 'src/main/public/' }));
    }
  }
}
