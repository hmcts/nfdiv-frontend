import dayjs from 'dayjs';
import { Application, NextFunction, Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import {
  APPLICATION_PAYMENT_STATES,
  ApplicationType,
  FINAL_ORDER_PAYMENT_STATES,
  State,
  YesOrNo,
} from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { signInNotRequired } from '../../steps/url-utils';
import {
  APPLICANT_2,
  APP_REPRESENTED,
  NO_RESPONSE_YET,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
  PageLink,
  REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
  RESPONDENT,
  SAVE_AND_SIGN_OUT,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  SWITCH_TO_SOLE_APPLICATION,
  THEIR_EMAIL_ADDRESS,
} from '../../steps/urls';

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        if (signInNotRequired(req.path as PageLink)) {
          return next('route');
        }

        const isApplicant2 = req.session.isApplicant2;
        const isSole = ApplicationType.SOLE_APPLICATION === req.session.existingApplicationType;
        const state = req.session.userCase?.state;

        // Check if user is represented by a solicitor redirect to represented page if they are
        if (this.isRepresentedBySolicitor(req.session.userCase, isApplicant2)) {
          if (!req.path.includes(APP_REPRESENTED)) {
            if (isApplicant2) {
              if (isSole) {
                return res.redirect(RESPONDENT + APP_REPRESENTED);
              } else {
                return res.redirect(APPLICANT_2 + APP_REPRESENTED);
              }
            }
            return res.redirect(APP_REPRESENTED);
          } else {
            return next();
          }
        }

        if (
          this.hasPartnerNotResponded(req.session.userCase, isApplicant2) &&
          ![NO_RESPONSE_YET, SWITCH_TO_SOLE_APPLICATION].includes(req.path as PageLink)
        ) {
          return res.redirect(NO_RESPONSE_YET);
        }

        const awaitingReviewByApplicant2 = !isSole && !isApplicant2 && state === State.AwaitingApplicant2Response;
        if (
          awaitingReviewByApplicant2 &&
          ![SENT_TO_APPLICANT2_FOR_REVIEW, THEIR_EMAIL_ADDRESS, NO_RESPONSE_YET, SWITCH_TO_SOLE_APPLICATION].includes(
            req.path as PageLink
          )
        ) {
          return res.redirect(SENT_TO_APPLICANT2_FOR_REVIEW);
        }

        if (
          !this.caseAwaitingPayment(state) ||
          [
            PAY_YOUR_FEE,
            PAY_AND_SUBMIT,
            PAYMENT_CALLBACK_URL,
            REQUEST_FOR_INFORMATION_SAVE_AND_SIGN_OUT,
            RESPONDENT + PAYMENT_CALLBACK_URL,
            RESPONDENT + PAY_YOUR_FINAL_ORDER_FEE,
            SAVE_AND_SIGN_OUT,
          ].includes(req.path as PageLink)
        ) {
          return next();
        }

        const finalOrderPayments = new PaymentModel(req.session.userCase.finalOrderPayments);
        if (FINAL_ORDER_PAYMENT_STATES.has(state) && req.session.isApplicant2 && finalOrderPayments.hasPayment) {
          return res.redirect(RESPONDENT + PAYMENT_CALLBACK_URL);
        }

        const applicationPayments = new PaymentModel(req.session.userCase.applicationPayments);
        if (APPLICATION_PAYMENT_STATES.has(state) && !req.session.isApplicant2 && applicationPayments.hasPayment) {
          return res.redirect(PAYMENT_CALLBACK_URL);
        }

        return next();
      })
    );
  }

  private caseAwaitingPayment(state: State): boolean {
    return new Set([...APPLICATION_PAYMENT_STATES, ...FINAL_ORDER_PAYMENT_STATES]).has(state);
  }

  private hasPartnerNotResponded(userCase: CaseWithId, isApplicant2: boolean) {
    return (
      ((isApplicant2 && [State.AwaitingApplicant1Response, State.Applicant2Approved].includes(userCase?.state)) ||
        (!isApplicant2 && userCase?.state === State.AwaitingApplicant2Response)) &&
      dayjs(userCase.dueDate).diff(dayjs()) < 0
    );
  }

  private isRepresentedBySolicitor(userCase: CaseWithId, isApplicant2?: boolean) {
    if (userCase === undefined) {
      return false;
    }

    if (isApplicant2) {
      return userCase.applicant2SolicitorRepresented === YesOrNo.YES;
    } else {
      return userCase.applicant1SolicitorRepresented === YesOrNo.YES;
    }
  }
}
