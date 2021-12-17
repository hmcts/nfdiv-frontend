import { Response } from 'express';

import { Case } from '../../app/case/case';
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
    if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
      throw new Error('Invalid case type');
    }

    const firstQuestionForm = req.session.isApplicant2
      ? getApplicant2FirstQuestionForm(req.session.userCase.applicationType!)
      : new Form(<FormFields>applicant1FirstQuestionForm.fields);
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    if (req.session.isApplicant2 && req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
      res.redirect(respondentRedirectPageSwitch(req.session.userCase.state, isFirstQuestionComplete));
    } else if (req.session.isApplicant2) {
      const isLastQuestionComplete = getNextIncompleteStepUrl(req).endsWith(CHECK_JOINT_APPLICATION);
      res.redirect(
        applicant2RedirectPageSwitch(
          req.session.userCase.state,
          req.session.userCase,
          isFirstQuestionComplete,
          isLastQuestionComplete
        )
      );
    } else {
      res.redirect(
        applicant1RedirectPageSwitch(req.session.userCase.state, req.session.userCase, isFirstQuestionComplete)
      );
    }
  }
}

const applicant1RedirectPageSwitch = (caseState: State, userCase: Partial<Case>, isFirstQuestionComplete: boolean) => {
  switch (caseState) {
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
    case State.ConditionalOrderDrafted: {
      return userCase.applicant1ApplyForConditionalOrderStarted
        ? userCase.applicationType === ApplicationType.SOLE_APPLICATION
          ? READ_THE_RESPONSE
          : CONTINUE_WITH_YOUR_APPLICATION
        : HUB_PAGE;
    }
    case State.AwaitingAos:
    case State.AwaitingConditionalOrder:
    case State.AosDrafted:
    case State.AosOverdue:
    case State.Holding:
    case State.AwaitingGeneralConsideration: {
      return HUB_PAGE;
    }
    default: {
      return isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL;
    }
  }
};

const applicant2RedirectPageSwitch = (
  caseState: State,
  userCase: Partial<Case>,
  isFirstQuestionComplete: boolean,
  isLastQuestionComplete: boolean
) => {
  switch (caseState) {
    case State.AwaitingConditionalOrder:
    case State.Holding: {
      return `${APPLICANT_2}${HUB_PAGE}`;
    }
    case State.Applicant2Approved: {
      return `${APPLICANT_2}${YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION}`;
    }
    case State.ConditionalOrderDrafted: {
      return userCase.applicant2ApplyForConditionalOrderStarted
        ? `${APPLICANT_2}${CONTINUE_WITH_YOUR_APPLICATION}`
        : `${APPLICANT_2}${HUB_PAGE}`;
    }
    default: {
      if (isLastQuestionComplete) {
        return `${APPLICANT_2}${CHECK_JOINT_APPLICATION}`;
      } else if (isFirstQuestionComplete) {
        return `${APPLICANT_2}${CHECK_ANSWERS_URL}`;
      } else {
        return `${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`;
      }
    }
  }
};

const respondentRedirectPageSwitch = (caseState: State, isFirstQuestionComplete: boolean) => {
  switch (caseState) {
    case State.AosDrafted:
    case State.AosOverdue: {
      return isFirstQuestionComplete
        ? `${RESPONDENT}${CHECK_ANSWERS_URL}`
        : `${RESPONDENT}${HOW_DO_YOU_WANT_TO_RESPOND}`;
    }
    default: {
      return `${RESPONDENT}${HUB_PAGE}`;
    }
  }
};

const getApplicant2FirstQuestionForm = (applicationType: ApplicationType) => {
  return applicationType === ApplicationType.SOLE_APPLICATION
    ? new Form(<FormFields>respondentFirstQuestionForm.fields)
    : new Form(<FormFields>applicant2FirstQuestionForm.fields);
};
