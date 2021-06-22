import { Step } from '../applicant1/applicant1Sequence';
import {
  ENTER_YOUR_ACCESS_CODE,
  HOME_URL,
  NOT_CONFIRMED_JOINT_APPLICATION,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
} from '../urls';

export const applicant2Sequence: Step[] = [
  {
    url: `${RELATIONSHIP_NOT_BROKEN_URL}2`,
    getNextStep: () => NOT_CONFIRMED_JOINT_APPLICATION,
  },
  {
    url: NOT_CONFIRMED_JOINT_APPLICATION,
    getNextStep: () => RELATIONSHIP_NOT_BROKEN_URL,
  },
  {
    url: ENTER_YOUR_ACCESS_CODE,
    getNextStep: () => YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
  },
  {
    url: YOU_NEED_TO_REVIEW_YOUR_APPLICATION,
    // TODO - to be replaced with Has your marriage irretrievably broken down page once developed
    getNextStep: () => HOME_URL,
  },
];
