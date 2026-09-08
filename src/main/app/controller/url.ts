import config from 'config';
import { Response } from 'express';

import { AppRequest } from './AppRequest';

export const getServiceOrigin = (req: AppRequest, res: Response): string => {
  const protocol = req.app.locals.developmentMode ? 'http://' : 'https://';
  const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';

  return `${protocol}${res.locals.host}${port}`;
};

export const getServiceUrl = (req: AppRequest, res: Response, path: string): string => {
  return `${getServiceOrigin(req, res)}${path}`;
};
