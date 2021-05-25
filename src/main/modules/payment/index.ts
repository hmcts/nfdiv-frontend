import config from 'config';
import dayjs from 'dayjs';
import { Application, NextFunction, Response } from 'express';

import { CITIZEN_UPDATE, PaymentStatus } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentClient, PaymentStatusCode } from '../../app/payment/PaymentClient';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, HOME_URL, PageLink } from '../../steps/urls';

export const PAYMENT_URL: PageLink = '/payment';
export const PAYMENT_CALLBACK_URL: PageLink = '/payment/callback';

/**
 * Adds payment middleware to add payment callbacks
 */
export class PaymentMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(
      PAYMENT_URL,
      errorHandler(async (req: AppRequest, res: Response) => {
        const protocol = app.locals.developmentMode ? 'http://' : 'https://';
        const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
        const returnUrl = `${protocol}${res.locals.host}${port}/${PAYMENT_URL}`;

        const paymentClient = new PaymentClient(req.session, returnUrl);
        const payments = new PaymentModel(req.session.userCase.payments);

        if (payments.hasPayment) {
          const lastPaymentAttempt = payments.lastPayment;

          if (lastPaymentAttempt.paymentStatus === PaymentStatus.SUCCESS) {
            return res.redirect(APPLICATION_SUBMITTED);
          }

          if (lastPaymentAttempt.paymentStatus === PaymentStatus.IN_PROGRESS) {
            const govPayment = await paymentClient.get(lastPaymentAttempt.paymentTransactionId);

            if (['created', 'started'].includes(govPayment.state.status) && govPayment._links?.next_url.href) {
              return res.redirect(govPayment._links.next_url.href);
            }

            let redirectUrl = HOME_URL;
            if (govPayment.state.status === 'failed') {
              let paymentStatus: PaymentStatus;
              switch (govPayment.state.code) {
                case PaymentStatusCode.PAYMENT_METHOD_REJECTED:
                  paymentStatus = PaymentStatus.DECLINED;
                  break;

                case PaymentStatusCode.PAYMENT_CANCELLED_BY_USER:
                case PaymentStatusCode.PAYMENT_CANCELLED_BY_APP:
                  paymentStatus = PaymentStatus.CANCELLED;
                  break;

                case PaymentStatusCode.PAYMENT_EXPIRED:
                  paymentStatus = PaymentStatus.TIMED_OUT;
                  break;

                default:
                  paymentStatus = PaymentStatus.ERROR;
                  break;
              }
              payments.update(govPayment.payment_id, {
                paymentStatus,
              });
            }

            if (govPayment.state.status === 'success') {
              payments.update(govPayment.payment_id, {
                paymentStatus: PaymentStatus.SUCCESS,
              });
              redirectUrl = APPLICATION_SUBMITTED;
            }

            req.session.userCase = await req.locals.api.triggerEvent(
              req.session.userCase.id,
              { payments: payments.list },
              CITIZEN_UPDATE
            );

            return req.session.save(() => res.redirect(redirectUrl));
          }
        }

        const govPayment = await paymentClient.create();
        payments.add({
          paymentDate: dayjs(govPayment.created_date).format('YYYY-MM-DD'), // @TODO this seems to only accept a date without time
          paymentFeeId: 'FEE0002', // @TODO
          paymentAmount: 55000,
          paymentSiteId: 'GOV Pay',
          paymentStatus: PaymentStatus.IN_PROGRESS,
          paymentChannel: govPayment.payment_provider,
          paymentReference: govPayment.reference,
          paymentTransactionId: govPayment.payment_id,
        });

        req.session.userCase = await req.locals.api.triggerEvent(
          req.session.userCase.id,
          { payments: payments.list },
          CITIZEN_UPDATE
        );

        req.session.save(err => {
          if (err) {
            throw err;
          }

          if (!govPayment._links?.next_url.href) {
            throw new Error('Failed to create new payment');
          }

          res.redirect(govPayment._links.next_url.href);
        });
      })
    );

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        const payments = new PaymentModel(req.session.userCase.payments);

        if (payments.hasPayment) {
          const lastPaymentAttempt = payments.lastPayment;
          if (lastPaymentAttempt.paymentStatus === PaymentStatus.IN_PROGRESS) {
            return res.redirect(PAYMENT_URL);
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
