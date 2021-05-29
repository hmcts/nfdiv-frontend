import config from 'config';
import dayjs from 'dayjs';
import { Application, NextFunction, Response } from 'express';

import {
  CITIZEN_ADD_PAYMENT,
  CITIZEN_SUBMIT,
  CITIZEN_UPDATE,
  OrderSummary,
  PaymentStatus,
  State,
} from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentClient } from '../../app/payment/PaymentClient';
import { PaymentModel, PaymentState } from '../../app/payment/PaymentModel';
import { APPLICATION_SUBMITTED, HOME_URL, PageLink } from '../../steps/urls';

export const PAYMENT_URL: PageLink = '/payment';
export const PAYMENT_CALLBACK_URL: PageLink = '/payment/callback';

// @TODO this should be already set by the case API
const applicationFeeOrderSummary: OrderSummary = {
  PaymentTotal: '55000',
  PaymentReference: '',
  Fees: [
    {
      id: 'FEE0002',
      value: {
        FeeDescription: 'Filing an application for a divorce, nullity or civil partnership dissolution',
        FeeVersion: '5',
        FeeCode: 'FEE0002',
        FeeAmount: '55000',
      },
    },
  ],
};

/**
 * Adds payment middleware to add payment callbacks
 */
export class PaymentMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.get(
      PAYMENT_URL,
      errorHandler(async (req: AppRequest, res: Response) => {
        if (req.session.userCase.state === State.Submitted) {
          return res.redirect(APPLICATION_SUBMITTED);
        }

        const protocol = app.locals.developmentMode ? 'http://' : 'https://';
        const port = app.locals.developmentMode ? `:${config.get('port')}` : '';
        const returnUrl = `${protocol}${res.locals.host}${port}${PAYMENT_URL}?callback=true`;

        const paymentClient = new PaymentClient(req.session, returnUrl);
        const payments = new PaymentModel(req.session.userCase.payments);

        if (payments.hasPayment) {
          const lastPaymentAttempt = payments.lastPayment;
          const govPayment = await paymentClient.get(lastPaymentAttempt.paymentTransactionId);

          if (['created', 'started'].includes(govPayment.state.status) && govPayment._links?.next_url.href) {
            return res.redirect(govPayment._links.next_url.href);
          }

          payments.setStatus(govPayment.payment_id, govPayment.state as PaymentState);

          let event = CITIZEN_UPDATE;
          let redirectUrl = HOME_URL;
          if (govPayment.state.status === 'success') {
            event = CITIZEN_ADD_PAYMENT;
            redirectUrl = APPLICATION_SUBMITTED;
          }

          req.session.userCase = await req.locals.api.triggerEvent(
            req.session.userCase.id,
            { payments: payments.list },
            event
          );

          if (req.query.callback || govPayment.state.status === 'success') {
            return req.session.save(() => res.redirect(redirectUrl));
          }
        }

        const govPayment = await paymentClient.create();
        payments.add({
          paymentDate: dayjs(govPayment.created_date).format('YYYY-MM-DD'), // @TODO this seems to only accept a date without time
          paymentFeeId: applicationFeeOrderSummary.Fees[0].id, // @TODO we should get this from the case API (when it returns one)
          paymentAmount: 55000,
          paymentSiteId: 'GOV Pay',
          paymentStatus: PaymentStatus.IN_PROGRESS,
          paymentChannel: govPayment.payment_provider,
          paymentReference: govPayment.reference,
          paymentTransactionId: govPayment.payment_id,
        });

        req.session.userCase = await req.locals.api.triggerEvent(
          req.session.userCase.id,
          {
            applicationFeeOrderSummary, // @TODO this should be already set by the case API
            payments: payments.list,
          },
          CITIZEN_SUBMIT
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
        if (
          [State.Submitted, State.AwaitingDocuments].includes(req.session.userCase.state) &&
          req.path !== APPLICATION_SUBMITTED
        ) {
          return res.redirect(APPLICATION_SUBMITTED);
        }

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
