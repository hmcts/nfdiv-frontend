import { Response } from 'express';

import { Case } from '../../app/case/case';
import { ApplicationType, State, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Form } from '../../app/form/Form';
import { form as applicant1FirstQuestionForm } from '../applicant1/your-details/content';
import { form as applicant2FirstQuestionForm } from '../applicant2/irretrievable-breakdown/content';
import {
  APPLICANT_2,
  APPLICATION_ENDED,
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  CONFIRM_JOINT_APPLICATION,
  HUB_1,
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

    const firstQuestionForm = new Form(
      req.session.isApplicant2 ? applicant2FirstQuestionForm : applicant1FirstQuestionForm
    );
    const isFirstQuestionComplete = firstQuestionForm.getErrors(req.session.userCase).length === 0;

    if (req.session.isApplicant2 && req.session.userCase.applicationType === ApplicationType.SOLE_APPLICATION) {
      res.redirect(respondentRedirectPageSwitch(req.session.userCase.state, isFirstQuestionComplete));
    } else if (req.session.isApplicant2) {
      res.redirect(applicant2RedirectPageSwitch(req.session.userCase.state, isFirstQuestionComplete));
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
    case State.Holding: {
      return HUB_1;
    }
    default: {
      return isFirstQuestionComplete ? CHECK_ANSWERS_URL : YOUR_DETAILS_URL;
    }
  }
};

const applicant2RedirectPageSwitch = (caseState: State, isFirstQuestionComplete: boolean) => {
  switch (caseState) {
    case State.Holding: {
      return `${APPLICANT_2}${HUB_1}`;
    }
    case State.Applicant2Approved: {
      return `${APPLICANT_2}${YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION}`;
    }
    default: {
      return isFirstQuestionComplete
        ? `${APPLICANT_2}${CHECK_ANSWERS_URL}`
        : `${APPLICANT_2}${YOU_NEED_TO_REVIEW_YOUR_APPLICATION}`;
    }
  }
};

const respondentRedirectPageSwitch = (caseState: State, isFirstQuestionComplete: boolean) => {
  return isFirstQuestionComplete ? `${RESPONDENT}${CHECK_ANSWERS_URL}` : `${RESPONDENT}${HUB_1}`;
};
