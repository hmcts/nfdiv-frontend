import { CaseWithId, Checkbox } from '../app/case/case';
import { ApplicationType, ChangedNameHow, State, YesOrNo } from '../app/case/definition';
import { needsToExplainDelay } from '../app/controller/controller.utils';

import { Step } from './applicant1Sequence';
import { nameChangedHowPossibleValue } from './common/content.utils';
import {
  ADDRESS_PRIVATE,
  APPLICANT_2,
  APPLY_FINANCIAL_ORDER,
  APPLY_FINANCIAL_ORDER_DETAILS,
  APP_REPRESENTED,
  AWAITING_RESPONSE_TO_HWF_DECISION,
  CHANGES_TO_YOUR_NAME_URL,
  CHANGING_TO_SOLE_APPLICATION,
  CHECK_ANSWERS_URL,
  CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  CHECK_CONTACT_DETAILS,
  CHECK_JOINT_APPLICATION,
  CHECK_PHONE_NUMBER,
  CONFIRM_JOINT_APPLICATION,
  CONFIRM_YOUR_NAME,
  CONTINUE_WITH_YOUR_APPLICATION,
  DETAILS_OTHER_PROCEEDINGS,
  ENGLISH_OR_WELSH,
  ENTER_YOUR_ADDRESS,
  ENTER_YOUR_NAMES,
  EXPLAIN_THE_DELAY,
  FINALISING_YOUR_APPLICATION,
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_PAYING_NEED_TO_APPLY,
  HELP_WITH_YOUR_FEE_URL,
  HOME_URL,
  HOW_THE_COURTS_WILL_CONTACT_YOU,
  HOW_TO_FINALISE_APPLICATION,
  HUB_PAGE,
  JOINT_APPLICATION_SUBMITTED,
  MONEY_PROPERTY,
  NOT_CONFIRMED_JOINT_APPLICATION,
  OTHER_COURT_CASES,
  PROVIDE_INFORMATION_TO_THE_COURT,
  RELATIONSHIP_NOT_BROKEN_URL,
  RESPOND_TO_COURT_FEEDBACK,
  REVIEW_YOUR_APPLICATION,
  REVIEW_YOUR_JOINT_APPLICATION,
  REVIEW_YOUR_RESPONSE,
  UPLOAD_YOUR_DOCUMENTS,
  WITHDRAWING_YOUR_APPLICATION,
  YOUR_COMMENTS_SENT,
  YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  YOU_CANNOT_APPLY,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from './urls';

export const preSubmissionSequence: Step[] = [
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    getNextStep: data =>
      data.applicant2ScreenHasUnionBroken === YesOrNo.NO
        ? YOU_CANNOT_APPLY
        : data.applicant1HelpPayingNeeded === YesOrNo.YES
          ? HELP_WITH_YOUR_FEE_URL
          : ENTER_YOUR_NAMES,
  },
  {
    url: YOU_CANNOT_APPLY,
    getNextStep: () => NOT_CONFIRMED_JOINT_APPLICATION,
  },
  {
    url: NOT_CONFIRMED_JOINT_APPLICATION,
    getNextStep: () => RELATIONSHIP_NOT_BROKEN_URL,
  },
  {
    url: HELP_WITH_YOUR_FEE_URL,
    getNextStep: data =>
      data.applicant2HelpPayingNeeded === YesOrNo.YES ? HELP_PAYING_HAVE_YOU_APPLIED : ENTER_YOUR_NAMES,
  },
  {
    url: HELP_PAYING_HAVE_YOU_APPLIED,
    getNextStep: data =>
      data.applicant2AlreadyAppliedForHelpPaying === YesOrNo.NO ? HELP_PAYING_NEED_TO_APPLY : ENTER_YOUR_NAMES,
  },
  {
    url: HELP_PAYING_NEED_TO_APPLY,
    getNextStep: () => HELP_PAYING_HAVE_YOU_APPLIED,
  },
  {
    url: ENTER_YOUR_NAMES,
    getNextStep: () => CONFIRM_YOUR_NAME,
  },
  {
    url: CONFIRM_YOUR_NAME,
    getNextStep: data => (data.applicant2ConfirmFullName === YesOrNo.NO ? ENTER_YOUR_NAMES : CHANGES_TO_YOUR_NAME_URL),
  },
  {
    url: CHANGES_TO_YOUR_NAME_URL,
    getNextStep: () => HOW_THE_COURTS_WILL_CONTACT_YOU,
  },
  {
    url: HOW_THE_COURTS_WILL_CONTACT_YOU,
    getNextStep: () => ENGLISH_OR_WELSH,
  },
  {
    url: ENGLISH_OR_WELSH,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    getNextStep: data => (hasApp2Confirmed(data) ? CHECK_CONTACT_DETAILS : ENTER_YOUR_ADDRESS),
  },
  {
    url: ENTER_YOUR_ADDRESS,
    getNextStep: data => (hasApp2Confirmed(data) ? ADDRESS_PRIVATE : OTHER_COURT_CASES),
  },
  {
    url: OTHER_COURT_CASES,
    getNextStep: data => (data.applicant2LegalProceedings === YesOrNo.YES ? DETAILS_OTHER_PROCEEDINGS : MONEY_PROPERTY),
  },
  {
    url: DETAILS_OTHER_PROCEEDINGS,
    getNextStep: () => MONEY_PROPERTY,
  },
  {
    url: MONEY_PROPERTY,
    getNextStep: () => APPLY_FINANCIAL_ORDER,
  },
  {
    url: APPLY_FINANCIAL_ORDER,
    getNextStep: data =>
      data.applicant2ApplyForFinancialOrder === YesOrNo.YES
        ? APPLY_FINANCIAL_ORDER_DETAILS
        : [ChangedNameHow.DEED_POLL, ChangedNameHow.OTHER].some(
              value => nameChangedHowPossibleValue(data, true)?.includes(value)
            )
          ? UPLOAD_YOUR_DOCUMENTS
          : CHECK_JOINT_APPLICATION,
  },
  {
    url: APPLY_FINANCIAL_ORDER_DETAILS,
    getNextStep: data =>
      [ChangedNameHow.DEED_POLL, ChangedNameHow.OTHER].some(
        value => nameChangedHowPossibleValue(data, true)?.includes(value)
      )
        ? UPLOAD_YOUR_DOCUMENTS
        : CHECK_JOINT_APPLICATION,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    getNextStep: () => CHECK_JOINT_APPLICATION,
  },
  {
    url: CHECK_JOINT_APPLICATION,
    getNextStep: data => (data.applicant2Confirmation === YesOrNo.YES ? CHECK_ANSWERS_URL : YOUR_COMMENTS_SENT),
  },
  {
    url: YOUR_COMMENTS_SENT,
    getNextStep: () => CHECK_ANSWERS_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => CONFIRM_JOINT_APPLICATION,
  },
  {
    url: CONFIRM_JOINT_APPLICATION,
    getNextStep: () => YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
  }
];

const postSubmissionSequence: Step[] = [
  {
    url: JOINT_APPLICATION_SUBMITTED,
    getNextStep: () => HOME_URL,
  },
  {
    url: YOUR_SPOUSE_NEEDS_TO_CONFIRM_YOUR_JOINT_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: AWAITING_RESPONSE_TO_HWF_DECISION,
    getNextStep: () => HOME_URL,
  },
  {
    url: HOW_TO_FINALISE_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: HUB_PAGE,
    getNextStep: () => HOME_URL,
  },
  {
    url: APP_REPRESENTED,
    getNextStep: () => HOME_URL,
  },
  {
    url: CONTINUE_WITH_YOUR_APPLICATION,
    getNextStep: data =>
      data.applicant2ApplyForConditionalOrder === YesOrNo.YES
        ? data.applicationType === ApplicationType.JOINT_APPLICATION
          ? REVIEW_YOUR_JOINT_APPLICATION
          : REVIEW_YOUR_APPLICATION
        : WITHDRAWING_YOUR_APPLICATION,
  },
  {
    url: REVIEW_YOUR_JOINT_APPLICATION,
    getNextStep: () => CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
  },
  {
    url: WITHDRAWING_YOUR_APPLICATION,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_CONDITIONAL_ORDER_ANSWERS_URL,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: FINALISING_YOUR_APPLICATION,
    getNextStep: data => (needsToExplainDelay(data) ? EXPLAIN_THE_DELAY : HUB_PAGE),
  },
  {
    url: EXPLAIN_THE_DELAY,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: CHANGING_TO_SOLE_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: CHECK_CONTACT_DETAILS,
    getNextStep: () => HOME_URL,
  },
  {
    url: CHECK_PHONE_NUMBER,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: ADDRESS_PRIVATE,
    getNextStep: () => CHECK_CONTACT_DETAILS,
  },
  {
    url: ENTER_YOUR_ADDRESS,
    getNextStep: () => ADDRESS_PRIVATE,
  },
  {
    url: PROVIDE_INFORMATION_TO_THE_COURT,
    getNextStep: () => HUB_PAGE,
  },
  {
    url: RESPOND_TO_COURT_FEEDBACK,
    getNextStep: () => REVIEW_YOUR_RESPONSE,
  },
  {
    url: REVIEW_YOUR_RESPONSE,
    getNextStep: () => HUB_PAGE,
  },
];

const hasApp2Confirmed = (data: Partial<CaseWithId>): boolean =>
  ![State.AwaitingApplicant1Response, State.AwaitingApplicant2Response, State.Draft].includes(data.state as State) &&
  data.applicant2IConfirmPrayer === Checkbox.Checked &&
  data.applicant2StatementOfTruth === Checkbox.Checked;

const addApplicant2Prefix = (theSequence: Step[]): Step[] => {
  return theSequence.map(step => ({
    ...step,
    url: `${APPLICANT_2}${step.url}`,
    getNextStep: data => `${APPLICANT_2}${step.getNextStep(data)}`,
  }));
};

export const applicant2PreSubmissionSequence = addApplicant2Prefix(preSubmissionSequence);
export const applicant2PostSubmissionSequence = addApplicant2Prefix(postSubmissionSequence);
