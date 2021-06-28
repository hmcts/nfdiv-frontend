import { Application, NextFunction, Response } from 'express';

import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, PAYMENT_CALLBACK_URL, PAY_YOUR_FEE, PageLink } from '../../steps/urls';

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (
          [State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision].includes(req.session.userCase?.state) &&
          req.path !== APPLICATION_SUBMITTED
        ) {
          return res.redirect(APPLICATION_SUBMITTED);
        }

        if (
          req.session.userCase?.state !== State.AwaitingPayment ||
          [PAY_YOUR_FEE, PAYMENT_CALLBACK_URL].includes(req.path as PageLink)
        ) {
          return next();
        }

        const payments = new PaymentModel(req.session.userCase.payments);
        if (payments.hasPayment) {
          return res.redirect(PAYMENT_CALLBACK_URL);
        }

        return next();
      })
    );
  }
}
