import { Step } from './applicant1Sequence';
import { HUB_PAGE, PRE_ISSUE_MAKE_AN_APPLICATION } from './urls';

export const preIssueInterimAppJourneySequence: Step[] = [
  {
    url: PRE_ISSUE_MAKE_AN_APPLICATION,
    getNextStep: () => HUB_PAGE,
  },
];
