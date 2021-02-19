import * as path from 'path';

import * as bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import favicon from 'serve-favicon';
import type { LoggerInstance } from 'winston';

import { AppInsights } from './modules/appinsights';
import { Container } from './modules/awilix';
import { CSRFToken } from './modules/csrf';
import { ErrorHandler } from './modules/error-handler';
import { HealthCheck } from './modules/health';
import { Helmet } from './modules/helmet';
import { LanguageToggle } from './modules/i18n';
import { Nunjucks } from './modules/nunjucks';
import { OidcMiddleware } from './modules/oidc';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { LoadTimeouts } from './modules/timeouts';
import { Webpack } from './modules/webpack';
import { Routes } from './routes';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();

app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

new PropertiesVolume().enableFor(app);
new Container().enableFor(app);
new ErrorHandler().enableFor(app, logger);
new LoadTimeouts().enableFor(app);
new Nunjucks().enableFor(app);
new Webpack().enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new HealthCheck().enableFor(app);
new AppInsights().enable();
new SessionStorage().enableFor(app);
new CSRFToken().enableFor(app);
new LanguageToggle().enableFor(app);
new OidcMiddleware().enableFor(app);
new Routes().enableFor(app);
new ErrorHandler().handleNextErrorsFor(app);

const port = config.get('port');
app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});
