import { Express } from 'express';

/**
 * Module that enables toggling between languages
 */
export class LanguageToggle {
  private supportedLanguages = ['en', 'cy'];

  public enableFor(app: Express): void {
    app.use((req, res, next) => {
      if (req.method === 'GET' && req.query['lng']) {
        const requestedLanguage = req.query['lng'] as string;

        if (this.supportedLanguages.includes(requestedLanguage)) {
          req.session['lang'] = requestedLanguage;
        }
      }
      next();
    });
  }
}
