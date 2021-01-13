import { Express, NextFunction, Response } from 'express';
import { ReqWithSession } from '../session';

/**
 * Module that enables toggling between languages
 */
export class LanguageToggle {
  private supportedLanguages = ['en', 'cy'];

  public enableFor(app: Express): void {
    app.use((req: ReqWithSession, res: Response, next: NextFunction) => {
      if (req.method === 'GET' && req.query['lng']) {
        const requestedLanguage = req.query['lng'] as string;

        if (this.supportedLanguages.includes(requestedLanguage)) {
          req.session.lang = requestedLanguage;
        }
      }
      next();
    });
  }
}
