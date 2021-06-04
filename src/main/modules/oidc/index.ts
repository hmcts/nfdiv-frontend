import config from 'config';
import { Application, NextFunction, Response } from 'express';

import { CALLBACK_URL, getRedirectUrl, getUserDetails } from '../../app/auth/user/oidc';
import { getCaseApi } from '../../app/case/CaseApi';
import { PaymentStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentModel } from '../../app/payment/PaymentModel';
import {
  APPLICATION_SUBMITTED,
  PAYMENT_CALLBACK_URL,
  PAYMENT_URL,
  PageLink,
  SIGN_IN_URL,
  SIGN_OUT_URL,
} from '../../steps/urls';

/**
 * Adds the oidc middleware to add oauth authentication
 */
export class OidcMiddleware {
  public enableFor(app: Application): void {
    const protocol = app.locals.developmentMode ? 'http://' : 'https://';
    const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
    const { errorHandler } = app.locals;

    app.get(SIGN_IN_URL, (req, res) => res.redirect(getRedirectUrl(`${protocol}${res.locals.host}${port}`)));
    app.get(SIGN_OUT_URL, (req, res) => req.session.destroy(() => res.redirect('/')));
    app.get(
      CALLBACK_URL,
      errorHandler(async (req, res) => {
        if (typeof req.query.code === 'string') {
          req.session.user = await getUserDetails(`${protocol}${res.locals.host}${port}`, req.query.code);
          req.session.save(() => res.redirect('/'));
        } else {
          res.redirect(SIGN_IN_URL);
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (req.session?.user) {
          res.locals.isLoggedIn = true;
          req.locals.api = getCaseApi(req.session.user, req.locals.logger);
          req.session.userCase =
            req.session.userCase || (await req.locals.api.getOrCreateCase(res.locals.serviceType, req.session.user));

          return next();
        } else {
          res.redirect(SIGN_IN_URL);
        }
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if ([PAYMENT_URL, PAYMENT_CALLBACK_URL].includes(req.path as PageLink)) {
          return next();
        }

        if (
          [State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision].includes(req.session.userCase.state) &&
          req.path !== APPLICATION_SUBMITTED
        ) {
          return res.redirect(APPLICATION_SUBMITTED);
        }

        const payments = new PaymentModel(req.session.userCase.payments);
        if (payments.hasPayment) {
          const lastPaymentAttempt = payments.lastPayment;
          if (
            req.session.userCase.state === State.AwaitingPayment &&
            lastPaymentAttempt.paymentStatus === PaymentStatus.IN_PROGRESS
          ) {
            return res.redirect(PAYMENT_CALLBACK_URL);
          }

          if (lastPaymentAttempt.paymentStatus === PaymentStatus.SUCCESS && req.path !== APPLICATION_SUBMITTED) {
            return res.redirect(APPLICATION_SUBMITTED);
          }
        }

        return next();
      })
    );
  }
}
