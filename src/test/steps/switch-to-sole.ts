import { State, YesOrNo } from '../../main/app/case/definition';
import { EXPLAIN_THE_DELAY, HOW_TO_FINALISE_APPLICATION, HUB_PAGE, YOUR_DETAILS_URL } from '../../main/steps/urls';

import { BrowserCase, caseworkerUpdatesTheCase } from './commonHelpers/case-interaction';
import { iClickSubmit } from './commonHelpers/element-interaction';
import { iClickToNavigate, iWaitInUrl } from './commonHelpers/navigation';
import {
  getApplicantString,
  getUserKeyByIndex,
  iLoginAsUser,
  isApplicant2,
  switchApplicant1AndApplicant2,
} from './commonHelpers/user-interaction';

const DATE_FINAL_ORDER_SUBMITTED = '2022-09-21T08:08:34.548';
const SWITCH_TO_SOLE_LINK_SELECTOR = '#switchToSoleLink';
const AWAITING_JOINT_FINAL_ORDER_OVERDUE_CONTENT_SELECTOR = '#awaitingJointFinalOrderOrFinalOrderOverdueContent';
const FINAL_ORDER_REQUESTED_CONTENT_SELECTOR = '#finalOrderRequestedContent';
const APPLICANT_CAN_INTEND_TO_SWITCH_TO_SOLE_FO_SELECTOR_SUFFIX = 'CanIntendToSwitchToSoleFo';

export const iSubmitToApplyAsSoleApplicant = async (url: string, expectedElementSelector?: string): Promise<void> => {
  await iClickSubmit();
  if (isApplicant2()) {
    switchApplicant1AndApplicant2();
  }
  iWaitInUrl(url, undefined, expectedElementSelector);
};

export const prepareTheCaseForSwitchToSoleFinalOrder = async (
  applicantIndex: string,
  overdue: boolean = false
): Promise<void> => {
  const userKey = getUserKeyByIndex(parseInt(applicantIndex));
  const caseData: Partial<BrowserCase> = {
    state: State.AwaitingJointFinalOrder,
    dateFinalOrderSubmitted: DATE_FINAL_ORDER_SUBMITTED,
    [`${getApplicantString()}${APPLICANT_CAN_INTEND_TO_SWITCH_TO_SOLE_FO_SELECTOR_SUFFIX}`]: YesOrNo.YES,
  };
  if (overdue) {
    caseData.isFinalOrderOverdue = YesOrNo.YES;
  }
  await caseworkerUpdatesTheCase(caseData);
  await iLoginAsUser(userKey, HUB_PAGE, AWAITING_JOINT_FINAL_ORDER_OVERDUE_CONTENT_SELECTOR);
  await iClickToNavigate(SWITCH_TO_SOLE_LINK_SELECTOR, undefined, HOW_TO_FINALISE_APPLICATION);
};

export const iSubmitToApplyForFinalOrderAsSoleApplicant = async (overdue: boolean = false): Promise<void> => {
  await iSubmitToApplyAsSoleApplicant(
    overdue ? EXPLAIN_THE_DELAY : HUB_PAGE,
    overdue ? undefined : FINAL_ORDER_REQUESTED_CONTENT_SELECTOR
  );
};

Given('I want to create a new application', async () => {
  await iSubmitToApplyAsSoleApplicant(YOUR_DETAILS_URL);
});
