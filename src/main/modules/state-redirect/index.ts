import dayjs from 'dayjs';
import { Application, NextFunction, Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { ApplicationType, State, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { PaymentModel } from '../../app/payment/PaymentModel';
import { signInNotRequired } from '../../steps/url-utils';
import {
  APPLICANT_2,
  APPLICATION_SUBMITTED,
  APP_REPRESENTED,
  HUB_PAGE,
  JOINT_APPLICATION_SUBMITTED,
  NO_RESPONSE_YET,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
  PageLink,
  RESPONDENT,
  SAVE_AND_SIGN_OUT,
  SWITCH_TO_SOLE_APPLICATION,
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

        // Check if user is represented by a solicitor redirect to represented page if they are
        if (this.isRepresentedBySolicitor(req.session.userCase, req.session.isApplicant2)) {
          if (!req.path.includes(APP_REPRESENTED)) {
            if (req.session.isApplicant2) {
              if (ApplicationType.SOLE_APPLICATION === req.session.existingApplicationType) {
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
          this.hasPartnerNotResponded(req.session.userCase, req.session.isApplicant2) &&
          ![NO_RESPONSE_YET, SWITCH_TO_SOLE_APPLICATION].includes(req.path as PageLink)
        ) {
          return res.redirect(NO_RESPONSE_YET);
        }

        const caseState = req.session.userCase?.state;
        if ([State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision].includes(caseState)) {
          const redirectPath = this.getApplicationSubmittedRedirectPath(req);
          if (redirectPath) {
            return res.redirect(redirectPath);
          }
        }

        if (
          !this.caseAwaitingPayment(req) ||
          [
            PAY_YOUR_FEE,
            PAY_AND_SUBMIT,
            PAYMENT_CALLBACK_URL,
            RESPONDENT + PAYMENT_CALLBACK_URL,
            RESPONDENT + PAY_YOUR_FINAL_ORDER_FEE,
            SAVE_AND_SIGN_OUT,
          ].includes(req.path as PageLink)
        ) {
          return next();
        }

        const finalOrderPayments = new PaymentModel(req.session.userCase.finalOrderPayments);
        if (
          caseState === State.AwaitingFinalOrderPayment &&
          req.session.isApplicant2 &&
          finalOrderPayments.hasPayment
        ) {
          return res.redirect(RESPONDENT + PAYMENT_CALLBACK_URL);
        }

        const applicationPayments = new PaymentModel(req.session.userCase.applicationPayments);
        if (caseState === State.AwaitingPayment && !req.session.isApplicant2 && applicationPayments.hasPayment) {
          return res.redirect(PAYMENT_CALLBACK_URL);
        }

        return next();
      })
    );
  }

  private caseAwaitingPayment(req: AppRequest): boolean {
    return [State.AwaitingPayment, State.AwaitingFinalOrderPayment].includes(req.session.userCase?.state);
  }

  private getApplicationSubmittedRedirectPath(req: AppRequest): string | null {
    const userCase = req.session.userCase;

    if (
      userCase?.applicationType === ApplicationType.SOLE_APPLICATION &&
      req.path !== APPLICATION_SUBMITTED &&
      req.path !== HUB_PAGE
    ) {
      return HUB_PAGE;
    }

    if (
      userCase?.applicationType === ApplicationType.JOINT_APPLICATION &&
      ![JOINT_APPLICATION_SUBMITTED, HUB_PAGE, APPLICANT_2 + HUB_PAGE].includes(req.path)
    ) {
      return req.session.isApplicant2 ? APPLICANT_2 + HUB_PAGE : HUB_PAGE;
    }

    return null;
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
