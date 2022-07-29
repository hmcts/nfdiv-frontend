import { Express } from 'express';
import Negotiator from 'negotiator';

export enum SupportedLanguages {
  En = 'en',
  Cy = 'cy',
}

/**
 * Module that enables toggling between languages
 */
export class LanguageToggle {
  static supportedLanguages = [SupportedLanguages.En, SupportedLanguages.Cy];

  public enableFor(app: Express): void {
    app.use((req, res, next) => {
      if (req.method === 'GET' && (req.query['lng'] || !req.session['lang'])) {
        // User selected language
        const requestedLanguage = req.query['lng'] as SupportedLanguages;
        if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
          req.session['lang'] = requestedLanguage;
        } else {
          // Browsers default language
          const negotiator = new Negotiator(req);
          req.session['lang'] = negotiator.language(LanguageToggle.supportedLanguages) || 'en';
        }
      }
      next();
    });
  }
}
