import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Logger } from '@hmcts/nodejs-logging';
import bodyParser from 'body-parser';
import config from 'config';
import express, { RequestHandler } from 'express';
import favicon from 'serve-favicon';
import toobusy from 'toobusy-js';
import type { LoggerInstance } from 'winston';

import { AppInsights } from './modules/appinsights/index.js';
import { AuthProvider } from './modules/auth-provider/index.js';
import { AxiosLogger } from './modules/axios-logger/index.js';
import { CSRFToken } from './modules/csrf/index.js';
import { DocumentDownloadMiddleware } from './modules/document-download/index.js';
import { ErrorHandler } from './modules/error-handler/index.js';
import { FeesRegister } from './modules/fees-register/index.js';
import { HealthCheck } from './modules/health/index.js';
import { Helmet } from './modules/helmet/index.js';
import { LanguageToggle } from './modules/i18n/index.js';
import { LaunchDarkly } from './modules/launch-darkly/index.js';
import { Nunjucks } from './modules/nunjucks/index.js';
import { OidcMiddleware } from './modules/oidc/index.js';
import { PropertiesVolume } from './modules/properties-volume/index.js';
import { SessionStorage } from './modules/session/index.js';
import { StateRedirectMiddleware } from './modules/state-redirect/index.js';
import { LoadTimeouts } from './modules/timeouts/index.js';
import { TooBusy } from './modules/too-busy/index.js';
import { WebpackDev } from './modules/webpack-dev/index.js';
import { Routes } from './routes.js';

const mainPath = path.dirname(fileURLToPath(import.meta.url));
const logger: LoggerInstance = Logger.getLogger('server');
const app = express();

app.locals.developmentMode = process.env.NODE_ENV !== 'production';
app.use(favicon(path.join(mainPath, '/public/assets/images/favicon.ico')));

function setStaticCachingPolicy(res, file) {
  if (path.extname(file).match(/\.(woff2?|ttf|otf|eot|svg|png)$/i)) {
    res.setHeader('Cache-Control', 'max-age=604800'); // Cache for 1 week
  } else {
    res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  }
}

app.use(
  express.static(path.join(mainPath, 'public'), {
    setHeaders: setStaticCachingPolicy,
  })
);

app.use((req, res, next) => {
  if (req.accepts('html')) {
    res.setHeader('Cache-Control', 'no-store');
  }

  next();
});

(async () => {
  try {
    new AxiosLogger().enableFor(app);

    const propertiesVolume = new PropertiesVolume();
    await propertiesVolume.enableFor(app);

    await LaunchDarkly.getInstance().enableFor(app);

    new ErrorHandler().enableFor(app, logger);
    new LoadTimeouts().enableFor(app);
    new Nunjucks().enableFor(app);
    new WebpackDev().enableFor(app);
    new Helmet().enableFor(app);
    new AppInsights().enable();
    new SessionStorage().enableFor(app, logger);
    new TooBusy().enableFor(app);
    new HealthCheck().enableFor(app);

    new DocumentDownloadMiddleware().enableFor(app);
    app.use(bodyParser.json() as RequestHandler);
    app.use(bodyParser.urlencoded({ extended: false }) as RequestHandler);

    new CSRFToken().enableFor(app);
    new LanguageToggle().enableFor(app);
    new AuthProvider().enable();
    new FeesRegister().enable();

    new OidcMiddleware().enableFor(app);
    new StateRedirectMiddleware().enableFor(app);
    await new Routes().enableFor(app);
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
  } catch (error) {
    logger.error('Failed to initialize secrets:', error);
    process.exit(1);
  }
})();
