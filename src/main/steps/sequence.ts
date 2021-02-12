import { Request } from 'express';

import {
  HAS_RELATIONSHIP_BROKEN_URL,
  RELATIONSHIP_DATE_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  YOUR_DETAILS_URL,
} from './urls';

export interface Step {
  id: string;
  title: string;
  field?: string;
  url: string;
  subSteps?: SubStep[];
}

interface SubStep extends Step {
  when: (response: Record<string, string>) => boolean;
  finalPage?: boolean;
}

const sequence: Step[] = [
  {
    id: 'your-details',
    title: 'Who are you applying to divorce?',
    field: 'partnerGender',
    url: YOUR_DETAILS_URL,
  },
  {
    id: 'has-relationship-broken',
    title: 'Has you marriage irretrievably broken down (it cannot be saved)?',
    field: 'screenHasUnionBroken',
    url: HAS_RELATIONSHIP_BROKEN_URL,
    subSteps: [
      {
        id: 'relationship-not-broken',
        title: 'You cannot apply to get a divorce',
        when: res => res.screenHasUnionBroken === 'No',
        url: RELATIONSHIP_NOT_BROKEN_URL,
        finalPage: true,
      },
    ],
  },
  {
    id: 'relationship-date',
    title: 'When did you get married?',
    field: 'relationshipDate',
    url: RELATIONSHIP_DATE_URL,
  },
];

export const getSteps = (steps: Step[] = [], start = sequence): Step[] => {
  for (const step of start) {
    steps.push(step);
    if (step.subSteps) {
      getSteps(steps, step.subSteps);
    }
  }
  return steps;
};

export const getNextStepUrl = (req: Request): string => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';

  const currentStep = sequence.find(step => step.url === path);
  if (!currentStep) {
    return '/step-not-found';
  }
  if (currentStep.subSteps?.length) {
    const foundMatchingSubstep = currentStep.subSteps.find(subStep => subStep.when(req.body));
    if (foundMatchingSubstep?.url) {
      return `${foundMatchingSubstep?.url}${queryString}`;
    }
  }
  const index = sequence.indexOf(currentStep);
  return `${sequence[index + 1]?.url || path}${queryString}`;
};
