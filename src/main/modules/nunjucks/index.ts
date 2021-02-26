import * as path from 'path';

import * as express from 'express';
import * as nunjucks from 'nunjucks';

import { CaseType } from '../../app/case/case';
import { FormInput } from '../../app/form/Form';

import { getCheckAnswersRows } from './getCheckAnswersRows';

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

    env.addGlobal(
      'formItems',
      function (items: FormInput[], userAnswer: string | Record<string, string>, type: string) {
        return items.map(i => ({
          text: this.env.globals.getContent.call(this, i.label),
          name: i.name,
          classes: i.classes,
          value: i.value || userAnswer?.[i.name as string] || userAnswer,
          attributes: i.attributes,
          checked: i.selected || type === 'checkboxes' ? userAnswer?.[i.name as string] : i.value === userAnswer,
          conditional:
            i.warning || i.subFields
              ? {
                  html: i.warning
                    ? env.render(`${__dirname}/../../steps/common/error/warning.njk`, {
                        message: this.env.globals.getContent.call(this, i.warning),
                        warning: this.ctx.warning,
                      })
                    : env.render(`${__dirname}/../../steps/common/form/fields.njk`, {
                        ...this.ctx,
                        form: { fields: i.subFields },
                      }),
                }
              : undefined,
        }));
      }
    );

    env.addGlobal('getCheckAnswersRows', getCheckAnswersRows);

    env.addFilter('json', function (value, spaces) {
      if (value instanceof nunjucks.runtime.SafeString) {
        value = value.toString();
      }
      const jsonString = JSON.stringify(value, null, spaces).replace(/</g, '\\u003c');
      return new nunjucks.runtime.SafeString(jsonString);
    });

    app.use((req, res, next) => {
      res.locals.host = req.headers['x-forwarded-host'] || req.hostname;
      res.locals.pagePath = req.path;
      res.locals.serviceType =
        res.locals.host.includes('civil') || 'forceCivilMode' in req.query ? CaseType.Dissolution : CaseType.Divorce;
      next();
    });
  }
}
