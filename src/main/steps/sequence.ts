import { AppRequest } from '../app/controller/AppRequest';

import { HAS_RELATIONSHIP_BROKEN_URL, RELATIONSHIP_NOT_BROKEN_URL, YOUR_DETAILS_URL } from './urls';

export interface Step {
  id: string;
  title: string;
  field?: string;
  url: string;
  subSteps?: SubStep[];
}

interface SubStep extends Step {
  when: (response: Record<string, unknown>) => boolean;
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
    title: 'Has your marriage irretrievably broken down (it cannot be saved)?',
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

export const getNextStepUrl = (req: AppRequest): string => {
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

export const getLatestIncompleteStepUrl = (req: AppRequest): string => {
  const state = req.session.state;

  if (!state || Object.keys(state).length === 0) {
    return sequence[0].url;
  }

  for (const step of [...sequence].reverse()) {
    if (!state[step.id]) {
      continue;
    }

    if (step.field && state[step.id]?.[step.field]) {
      const foundStepIdx = sequence.findIndex(s => s.id === step.id);
      if (foundStepIdx !== -1) {
        const nextStep = sequence[foundStepIdx + 1] || sequence[foundStepIdx];
        return nextStep.url;
      }
    }
  }

  return sequence[0].url;
};
