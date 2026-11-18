import { State, YesOrNo } from '../../main/app/case/definition';
import { EXPLAIN_THE_DELAY, HOW_TO_FINALISE_APPLICATION, HUB_PAGE, YOUR_DETAILS_URL } from '../../main/steps/urls';

import { BrowserCase, caseworkerUpdatesTheCase } from './commonHelpers/caseInteraction';
import { iClickSubmit } from './commonHelpers/elementInteraction';
import { iClickToNavigate, iWaitInUrl } from './commonHelpers/navigation';
import {
  getApplicantString,
  getUserKeyByIndex,
  iLoginAsUser,
  isApplicant2,
  switchApplicant1AndApplicant2,
} from './commonHelpers/userInteraction';

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
    dateFinalOrderSubmitted: '2022-09-21T08:08:34.548',
    [`${getApplicantString()}CanIntendToSwitchToSoleFo`]: YesOrNo.YES,
  };
  if (overdue) {
    caseData.isFinalOrderOverdue = YesOrNo.YES;
  }
  await caseworkerUpdatesTheCase(caseData);
  await iLoginAsUser(userKey, HUB_PAGE, '#secondInTimeFinalOrderNotSubmittedContent');
  await iClickToNavigate('#switchToSoleLink', undefined, HOW_TO_FINALISE_APPLICATION);
};

export const iSubmitToApplyForFinalOrderAsSoleApplicant = async (overdue: boolean = false): Promise<void> => {
  await iSubmitToApplyAsSoleApplicant(
    overdue ? EXPLAIN_THE_DELAY : HUB_PAGE,
    overdue ? undefined : '#finalOrderRequestedContent'
  );
};

Given('I want to create a new application', async () => {
  await iSubmitToApplyAsSoleApplicant(YOUR_DETAILS_URL);
});
