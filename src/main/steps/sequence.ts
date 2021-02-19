import { Case, CaseDate, YesOrNo } from '../app/api/case';
import { isLessThanAYear } from '../app/form/validation';

import {
  CERTIFICATE_URL,
  HAS_RELATIONSHIP_BROKEN_URL,
  NO_CERTIFICATE_URL,
  RELATIONSHIP_DATE_LESS_THAN_YEAR_URL,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOUR_DETAILS_URL,
} from './urls';

export interface Step {
  url: string;
  isFinalPage?: boolean;
  subSteps?: SubStep[];
}

export interface SubStep extends Step {
  when: (response: Partial<Case>) => boolean;
}

export const sequence: Step[] = [
  {
    url: YOUR_DETAILS_URL,
  },
  {
    url: HAS_RELATIONSHIP_BROKEN_URL,
    subSteps: [
      {
        when: res => res.screenHasUnionBroken === YesOrNo.No,
        url: RELATIONSHIP_NOT_BROKEN_URL,
        isFinalPage: true,
      },
    ],
  },
  {
    url: RELATIONSHIP_DATE_URL,
    //TODO change when ticket is picked up
    subSteps: [
      {
        when: res => !!res.relationshipDate && isLessThanAYear(res.relationshipDate as CaseDate) === 'lessThanAYear',
        url: RELATIONSHIP_DATE_LESS_THAN_YEAR_URL,
        isFinalPage: true,
      },
    ],
  },
  {
    url: CERTIFICATE_URL,
    subSteps: [
      {
        when: res => res.hasCertificate === YesOrNo.No,
        url: NO_CERTIFICATE_URL,
        isFinalPage: true,
      },
    ],
  },
];
