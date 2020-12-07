import * as bodyParser from 'body-parser';
import config from 'config';
import express from 'express';
import { Helmet } from './modules/helmet';
import * as path from 'path';
import favicon from 'serve-favicon';
import { Nunjucks } from './modules/nunjucks';
import { Container } from './modules/awilix';
import { HealthCheck } from './modules/health';
import { PropertiesVolume } from './modules/properties-volume';
import { SessionStorage } from './modules/session';
import { AppInsights } from './modules/appinsights';
import { Routes } from './routes';
import { Webpack } from './modules/webpack';

const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('server');
const env = process.env.NODE_ENV || 'development';
const app = express();

app.locals.developmentMode = env === 'development';
app.use(favicon(path.join(__dirname, '/public/assets/images/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-cache, max-age=0, must-revalidate, no-store',
  );
  next();
});

new PropertiesVolume().enableFor(app);
new Container().enableFor(app);
new SessionStorage().enableFor(app);
new Nunjucks().enableFor(app);
new Webpack().enableFor(app);
new Helmet(config.get('security')).enableFor(app);
new HealthCheck().enableFor(app);
new AppInsights().enable();
new Routes().enableFor(app);

app.listen(config.get('port'), () => {
  logger.info(`Application started: http://localhost:${config.get('port')}`);
});
