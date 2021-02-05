import * as path from 'path';

import * as express from 'express';
import * as nunjucks from 'nunjucks';

import { FormInput } from '../../app/form/Form';

export class Nunjucks {
  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const govUkFrontendPath = path.join(__dirname, '..', '..', '..', '..', 'node_modules', 'govuk-frontend');
    const env = nunjucks.configure([path.join(__dirname, '..', '..', 'steps'), govUkFrontendPath], {
      autoescape: true,
      watch: app.locals.developmentMode,
      express: app,
    });

    env.addGlobal('getContent', function (prop): string {
      return typeof prop === 'function' ? prop(this.ctx) : prop;
    });

    env.addGlobal('formItems', function (items: FormInput[]) {
      return items.map(i => ({
        text: this.env.globals.getContent.call(this, i.label),
        value: i.value,
        selected: i.selected,
        conditional: i.conditional && {
          html: `
            <div class="govuk-warning-text">
              <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
              <strong class="govuk-warning-text__text">
                <span class="govuk-warning-text__assistive">Warning</span>
                ${this.env.globals.getContent.call(this, i.conditional)}
              </strong>
            </div>`,
        },
      }));
    });

    app.use((req, res, next) => {
      res.locals.host = req.headers['x-forwarded-host'] || req.hostname;
      res.locals.pagePath = req.path;
      res.locals.serviceType = res.locals.host.includes('civil') || 'forceCivilMode' in req.query ? 'civil' : 'divorce';
      next();
    });
  }
}
