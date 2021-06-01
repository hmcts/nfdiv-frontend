import { Application, NextFunction, Response } from 'express';

import { PaymentStatus, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentController } from '../../app/controller/PaymentController';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, PAYMENT_CALLBACK_URL, PAYMENT_URL } from '../../steps/urls';

/**
 * Adds payment middleware to add payment callbacks
 */
export class PaymentMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    const paymentController = new PaymentController();

    app.get(PAYMENT_URL, errorHandler(paymentController.payment.bind(paymentController)));
    app.get(PAYMENT_CALLBACK_URL, errorHandler(paymentController.callback.bind(paymentController)));

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
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
