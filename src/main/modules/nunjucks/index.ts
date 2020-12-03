import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';

export class Nunjucks {
  constructor() {
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const govUkFrontendPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'node_modules',
      'govuk-frontend',
    );
    nunjucks.configure(
      [path.join(__dirname, '..', '..', 'steps'), govUkFrontendPath],
      {
        autoescape: true,
        watch: app.locals.developmentMode,
        express: app,
      },
    );

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      next();
    });
  }
}
