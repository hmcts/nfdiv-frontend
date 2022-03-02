import * as path from 'path';

import * as bodyParser from 'body-parser';
import config from 'config';
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';

import { AppInsights } from './modules/appinsights';
import { AuthProvider } from './modules/auth-provider';
import { AxiosLogger } from './modules/axios-logger';
import { CSRFToken } from './modules/csrf';
import { DocumentDownloadMiddleware } from './modules/document-download';
import { ErrorHandler } from './modules/error-handler';
import { FeesRegister } from './modules/fees-register';
import { HealthCheck } from './modules/health';
import { Helmet } from './modules/helmet';
import { LanguageToggle } from './modules/i18n';
import { Nunjucks } from './modules/nunjucks';
import { OidcMiddleware } from './modules/oidc';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { StateRedirectMiddleware } from './modules/state-redirect';
import { LoadTimeouts } from './modules/timeouts';
import { TooBusy } from './modules/too-busy';
import { Webpack } from './modules/webpack';
import { Routes } from './routes';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();

app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json() as RequestHandler);
app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

new AxiosLogger().enableFor(app);
new PropertiesVolume().enableFor(app);
new ErrorHandler().enableFor(app, logger);
new LoadTimeouts().enableFor(app);
new Nunjucks().enableFor(app);
new Webpack().enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new AppInsights().enable();
new SessionStorage().enableFor(app);
new TooBusy().enableFor(app);
new HealthCheck().enableFor(app);
new CSRFToken().enableFor(app);
new DocumentDownloadMiddleware().enableFor(app);
new LanguageToggle().enableFor(app);
new AuthProvider().enable();
new FeesRegister().enable();
new OidcMiddleware().enableFor(app);
new StateRedirectMiddleware().enableFor(app);
new Routes().enableFor(app);
new ErrorHandler().handleNextErrorsFor(app);

const port = config.get('port');
const server = app.listen(port, () => {
  logger.info(`Application started: http://localhost:${port}`);
});

process.on('SIGINT', function () {
  server.close();
  toobusy.shutdown();
  process.exit();
});
