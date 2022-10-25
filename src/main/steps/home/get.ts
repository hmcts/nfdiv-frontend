import { Response } from 'express';
import { isEmpty } from 'lodash';

import { CaseWithId, Checkbox } from '../../app/case/case';
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
  CHECK_ANSWERS_URL,
  CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  CHECK_JOINT_APPLICATION,
  CONFIRM_JOINT_APPLICATION,
  CONTINUE_WITH_YOUR_APPLICATION,
  HOW_DO_YOU_WANT_TO_RESPOND,
  HUB_PAGE,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
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
      res.redirect(YOUR_DETAILS_URL);
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
    case State.Submitted: {
      return APPLICATION_SUBMITTED;
    }
    case State.AwaitingPayment: {
      return userCase.applicationType === ApplicationType.JOINT_APPLICATION ? PAY_AND_SUBMIT : PAY_YOUR_FEE;
    }
    case State.ConditionalOrderDrafted:
    case State.ConditionalOrderPending: {
      if (userCase.coApplicant1SubmittedDate) {
        return HUB_PAGE;
      } else if (userCase.applicant1ApplyForConditionalOrder) {
        return CHECK_CONDITIONAL_ORDER_ANSWERS_URL;
      } else if (userCase.applicant1ApplyForConditionalOrderStarted) {
        return userCase.applicationType === ApplicationType.SOLE_APPLICATION &&
          (userCase.applicant2StatementOfTruth === Checkbox.Checked ||
            userCase.aosStatementOfTruth === Checkbox.Checked)
          ? READ_THE_RESPONSE
          : CONTINUE_WITH_YOUR_APPLICATION;
      } else {
        return HUB_PAGE;
      }
    }
    case State.Draft: {
      return isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL;
    }
    default: {
      return HUB_PAGE;
    }
  }
};

const applicant2RedirectPageSwitch = (req: AppRequest, isFirstQuestionComplete: boolean) => {
  const isLastQuestionComplete = getNextIncompleteStepUrl(req).endsWith(CHECK_JOINT_APPLICATION);
  switch (req.session.userCase.state) {
    case State.FinalOrderRequested:
    case State.AwaitingConditionalOrder:
    case State.AwaitingPronouncement:
    case State.ConditionalOrderPronounced:
    case State.AwaitingClarification:
    case State.AwaitingAmendedApplication:
    case State.FinalOrderComplete:
    case State.ClarificationSubmitted:
    case State.AwaitingFinalOrder:
    case State.AwaitingJointFinalOrder:
    case State.FinalOrderOverdue:
    case State.Holding: {
      return HUB_PAGE;
    }
    case State.Applicant2Approved: {
      return YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION;
    }
    case State.ConditionalOrderDrafted:
    case State.ConditionalOrderPending: {
      if (req.session.userCase.coApplicant2SubmittedDate) {
        return HUB_PAGE;
      }
      return req.session.userCase.applicant2ApplyForConditionalOrder
        ? CHECK_CONDITIONAL_ORDER_ANSWERS_URL
        : req.session.userCase.applicant2ApplyForConditionalOrderStarted
        ? CONTINUE_WITH_YOUR_APPLICATION
        : HUB_PAGE;
    }
    case State.AwaitingLegalAdvisorReferral: {
      return HUB_PAGE;
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
  switch (userCase.state) {
    case State.Holding:
    case State.AwaitingConditionalOrder:
    case State.IssuedToBailiff:
    case State.AwaitingBailiffService:
    case State.AwaitingBailiffReferral:
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
        return HUB_PAGE;
      }
    }
    case State.AosDrafted:
    case State.AosOverdue: {
      return isFirstQuestionComplete ? CHECK_ANSWERS_URL : HOW_DO_YOU_WANT_TO_RESPOND;
    }
    default: {
      return HUB_PAGE;
    }
  }
};
