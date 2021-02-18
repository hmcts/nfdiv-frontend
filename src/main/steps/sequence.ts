import { YesOrNo } from '../app/api/case';
import { isLessThanAYear } from '../app/form/validation';

import {
  CERTIFICATE_URL,
  COOKIES_URL,
  HAS_RELATIONSHIP_BROKEN_URL,
  NO_CERTIFICATE_URL,
  PageLink,
  RELATIONSHIP_DATE_LESS_THAN_YEAR_URL,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOUR_DETAILS_URL,
} from './urls';

export interface Step {
  url: string;
  getNextStep: (CaseWithId) => PageLink;
}

export const sequence: Step[] = [
  {
    url: YOUR_DETAILS_URL,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    getNextStep: data =>
      data.screenHasUnionBroken === YesOrNo.No ? RELATIONSHIP_NOT_BROKEN_URL : RELATIONSHIP_DATE_URL,
  },
  {
    url: RELATIONSHIP_NOT_BROKEN_URL,
    getNextStep: () => HAS_RELATIONSHIP_BROKEN_URL,
  },
  {
    url: RELATIONSHIP_DATE_URL,
    getNextStep: data =>
      isLessThanAYear(data.relationshipDate) === 'lessThanAYear'
        ? RELATIONSHIP_DATE_LESS_THAN_YEAR_URL
        : CERTIFICATE_URL,
  },
  {
    url: RELATIONSHIP_DATE_LESS_THAN_YEAR_URL,
    getNextStep: () => RELATIONSHIP_DATE_URL,
  },
  {
    url: CERTIFICATE_URL,
    getNextStep: data => (data.hasCertificate === YesOrNo.No ? NO_CERTIFICATE_URL : COOKIES_URL),
  },
  {
    url: NO_CERTIFICATE_URL,
    getNextStep: () => CERTIFICATE_URL,
  },
];
