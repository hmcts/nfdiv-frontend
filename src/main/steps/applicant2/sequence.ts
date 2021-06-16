import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../sequence';
import {
  APPLICATION_SUBMITTED,
  CHECK_ANSWERS_URL,
  HAS_RELATIONSHIP_BROKEN_URL,
  HOME_URL,
  NOT_CONFIRMED_JOINT_APPLICATION,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
} from '../urls';

export const sequence: Step[] = [
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    showInSection: Sections.AboutPartnership,
    getNextStep: data =>
      data.screenHasUnionBroken === YesOrNo.NO ? RELATIONSHIP_NOT_BROKEN_URL : RELATIONSHIP_DATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_BROKEN_URL,
    getNextStep: () => NOT_CONFIRMED_JOINT_APPLICATION,
  },
  {
    url: NOT_CONFIRMED_JOINT_APPLICATION,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: CHECK_ANSWERS_URL,
    getNextStep: () => APPLICATION_SUBMITTED,
  },
  {
    url: APPLICATION_SUBMITTED,
    getNextStep: () => HOME_URL,
  },
];
