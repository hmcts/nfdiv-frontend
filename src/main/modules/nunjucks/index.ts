import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';
import { FormInput } from '../../app/form/Form';

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
    const env = nunjucks.configure(
      [path.join(__dirname, '..', '..', 'steps'), govUkFrontendPath],
      {
        autoescape: true,
        watch: app.locals.developmentMode,
        express: app,
      },
    );

    env.addGlobal('getContent', function(prop: any): string {
      return typeof prop === 'function' ? prop(this.ctx) :  prop;
    });

    env.addGlobal('formItems', function(items: FormInput[]) {
      return items.map(i => ({
        text: this.env.globals.getContent.call(this, i.label),
        value: i.value,
        selected: i.selected
      }));
    });

    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      res.locals.serviceType = req.hostname.includes('civil') || 'forceCivilMode' in req.query || process.env.civilMode === 'true' ? 'civil' : 'divorce';
      next();
    });
  }
}
