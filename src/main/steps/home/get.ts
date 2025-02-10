import { Response } from 'express';
import { isEmpty } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { ApplicationType, State, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Form, FormFields } from '../../app/form/Form';
import { form as applicant1FirstQuestionForm } from '../applicant1/your-details/content';
import { form as applicant2FirstQuestionForm } from '../applicant2/irretrievable-breakdown/content';
import { getNextIncompleteStepUrl } from '../index';
import { form as respondentFirstQuestionForm } from '../respondent/how-do-you-want-to-respond/content';
import {
  APPLICANT_2,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  APP_REPRESENTED,
  AWAITING_RESPONSE_TO_HWF_DECISION,
  CHECK_ANSWERS_URL,
  CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  CHECK_JOINT_APPLICATION,
  CONFIRM_JOINT_APPLICATION,
  CONTINUE_WITH_YOUR_APPLICATION,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HUB_PAGE,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PAY_YOUR_FINAL_ORDER_FEE,
  READ_THE_RESPONSE,
  RESPONDENT,
  SENT_TO_APPLICANT2_FOR_REVIEW,
  YOUR_DETAILS_URL,
  YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    if (!req.session.userCase) {
      return res.redirect(YOUR_DETAILS_URL);
    }

    if (req.session.userCase && req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    const firstQuestionFormContent = req.session.isApplicant2
      ? getApplicant2FirstQuestionForm(req.session.userCase.applicationType as ApplicationType)
      : applicant1FirstQuestionForm;

    const firstQuestionForm = new Form(<FormFields>firstQuestionFormContent.fields);
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    if (!req.session.isApplicant2) {
      res.redirect(applicant1RedirectPageSwitch(req.session.userCase, isFirstQuestionComplete));
    } else if (req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
      res.redirect(RESPONDENT + respondentRedirectPageSwitch(req.session.userCase, isFirstQuestionComplete));
    } else {
      res.redirect(APPLICANT_2 + applicant2RedirectPageSwitch(req, isFirstQuestionComplete));
    }
  }
}

const getApplicant2FirstQuestionForm = (applicationType: ApplicationType) =>
  applicationType === ApplicationType.SOLE_APPLICATION ? respondentFirstQuestionForm : applicant2FirstQuestionForm;

const applicant1RedirectPageSwitch = (userCase: Partial<CaseWithId>, isFirstQuestionComplete: boolean) => {
  // Check if applicant1 is solicitor represented
  const isSolicitorRepresented = userCase.applicant1SolicitorRepresented === YesOrNo.YES;

  switch (userCase.state) {
    case State.AwaitingApplicant1Response: {
      return userCase.applicant2ScreenHasUnionBroken === YesOrNo.NO ? APPLICATION_ENDED : CHECK_ANSWERS_URL;
    }
    case State.AwaitingApplicant2Response: {
      return SENT_TO_APPLICANT2_FOR_REVIEW;
    }
    case State.Applicant2Approved: {
      return CONFIRM_JOINT_APPLICATION;
    }
    case State.Submitted:
    case State.AwaitingDocuments:
    case State.AwaitingHWFDecision: {
      return isSolicitorRepresented ? APP_REPRESENTED : APPLICATION_SUBMITTED;
    }
    case State.AwaitingResponseToHWFDecision:
    case State.AwaitingPayment: {
      return userCase.applicationType === ApplicationType.JOINT_APPLICATION ? PAY_AND_SUBMIT : PAY_YOUR_FEE;
    }
    case State.ConditionalOrderDrafted:
    case State.ConditionalOrderPending: {
      if (userCase.coApplicant1SubmittedDate) {
        return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
      } else if (userCase.applicant1ApplyForConditionalOrder) {
        return CHECK_CONDITIONAL_ORDER_ANSWERS_URL;
      } else if (userCase.applicant1ApplyForConditionalOrderStarted) {
        return userCase.applicationType === ApplicationType.SOLE_APPLICATION && userCase.dateAosSubmitted
          ? READ_THE_RESPONSE
          : CONTINUE_WITH_YOUR_APPLICATION;
      } else {
        return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
      }
    }
    case State.PendingHearingDate:
    case State.PendingHearingOutcome:
      return HUB_PAGE;
    case State.Draft: {
      return isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL;
    }
    default: {
      return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
    }
  }
};

const applicant2RedirectPageSwitch = (req: AppRequest, isFirstQuestionComplete: boolean) => {
  const isLastQuestionComplete = getNextIncompleteStepUrl(req).endsWith(CHECK_JOINT_APPLICATION);

  // Check if applicant2 is solicitor represented
  const isSolicitorRepresented = req.session.userCase.applicant2SolicitorRepresented === YesOrNo.YES;

  switch (req.session.userCase.state) {
    case State.InformationRequested:
    case State.AwaitingRequestedInformation:
    case State.RequestedInformationSubmitted:
    case State.AwaitingGeneralConsideration:
    case State.GeneralConsiderationComplete:
    case State.PendingHearingOutcome:
    case State.FinalOrderRequested:
    case State.AwaitingConditionalOrder:
    case State.AwaitingPronouncement:
    case State.ConditionalOrderPronounced:
    case State.AwaitingClarification:
    case State.AwaitingAmendedApplication:
    case State.FinalOrderComplete:
    case State.ClarificationSubmitted:
    case State.AwaitingFinalOrder:
    case State.AwaitingFinalOrderPayment:
    case State.AwaitingJointFinalOrder:
    case State.Holding:
    case State.LAReview:
    case State.Submitted:
    case State.AwaitingDocuments:
    case State.AwaitingHWFDecision:
    case State.AwaitingHWFEvidence:
    case State.AwaitingLegalAdvisorReferral: {
      return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
    }
    case State.AwaitingPayment:
    case State.Applicant2Approved: {
      return YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION;
    }
    case State.AwaitingResponseToHWFDecision: {
      return AWAITING_RESPONSE_TO_HWF_DECISION;
    }
    case State.ConditionalOrderDrafted:
    case State.ConditionalOrderPending: {
      if (req.session.userCase.coApplicant2SubmittedDate) {
        return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
      }
      return req.session.userCase.applicant2ApplyForConditionalOrder
        ? CHECK_CONDITIONAL_ORDER_ANSWERS_URL
        : req.session.userCase.applicant2ApplyForConditionalOrderStarted
          ? CONTINUE_WITH_YOUR_APPLICATION
          : isSolicitorRepresented
            ? APP_REPRESENTED
            : HUB_PAGE;
    }
    default: {
      if (isLastQuestionComplete) {
        return CHECK_JOINT_APPLICATION;
      } else if (isFirstQuestionComplete) {
        return CHECK_ANSWERS_URL;
      } else {
        return YOU_NEED_TO_REVIEW_YOUR_APPLICATION;
      }
    }
  }
};

const respondentRedirectPageSwitch = (userCase: Partial<CaseWithId>, isFirstQuestionComplete: boolean) => {
  const hasReviewedTheApplication = !isEmpty(userCase.confirmReadPetition);
  const isLastQuestionComplete =
    !isEmpty(userCase.aosStatementOfTruth) || !isEmpty(userCase.applicant2StatementOfTruth); // todo - remove applicant2StatementOfTruth check after NFDIV-2321 is complete

  // Check if applicant2/respondent is solicitor represented
  const isSolicitorRepresented = userCase.applicant2SolicitorRepresented === YesOrNo.YES;

  switch (userCase.state) {
    case State.Holding:
    case State.AwaitingConditionalOrder:
    case State.IssuedToBailiff:
    case State.AwaitingBailiffService:
    case State.AwaitingBailiffReferral:
    case State.BailiffRefused:
    case State.AwaitingServiceConsideration:
    case State.AwaitingServicePayment:
    case State.AwaitingAlternativeService:
    case State.AwaitingDwpResponse:
    case State.AwaitingJudgeClarification:
    case State.GeneralConsiderationComplete:
    case State.AwaitingGeneralReferralPayment:
    case State.AwaitingGeneralConsideration:
    case State.GeneralApplicationReceived: {
      if (hasReviewedTheApplication && !isLastQuestionComplete) {
        return isFirstQuestionComplete ? CHECK_ANSWERS_URL : HOW_DO_YOU_WANT_TO_RESPOND;
      } else {
        return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
      }
    }
    case State.AwaitingFinalOrderPayment: {
      return PAY_YOUR_FINAL_ORDER_FEE;
    }
    case State.AosDrafted:
    case State.AosOverdue: {
      return isFirstQuestionComplete ? CHECK_ANSWERS_URL : HOW_DO_YOU_WANT_TO_RESPOND;
    }
    default: {
      return isSolicitorRepresented ? APP_REPRESENTED : HUB_PAGE;
    }
  }
};
