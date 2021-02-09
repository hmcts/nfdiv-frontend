import { Request } from 'express';

import {
  HAS_RELATIONSHIP_BROKEN_URL,
  RELATIONSHIP_NOT_BROKEN_URL,
  UNION_CERTIFICATE_URL,
  YOUR_DETAILS_URL,
} from './urls';

export interface Step {
  id: string;
  title: string;
  field: string;
  url: string;
  subSteps?: SubStep[];
}

interface SubStep extends Step {
  when: (response: Record<string, string>) => boolean;
  finalPage?: boolean;
}

// @TODO Remove this type once all steps have been implemented
interface IncompleteStep {
  id?: string;
  title: string;
  field?: string;
  url?: string;
  subSteps?: IncompleteSubStep[];
}

interface IncompleteSubStep extends IncompleteStep {
  when: (response: Record<string, string>) => boolean;
  finalPage?: boolean;
}

const sequence: IncompleteStep[] = [
  {
    id: 'your-details',
    title: 'Who are you applying to divorce?',
    url: YOUR_DETAILS_URL,
  },
  {
    id: 'has-relationship-broken',
    title: 'Has you marriage irretrievably broken down (it cannot be saved)?',
    url: HAS_RELATIONSHIP_BROKEN_URL,
    subSteps: [
      {
        id: 'relationship-not-broken',
        title: 'You cannot apply to get a divorce',
        field: 'screenHasUnionBroken',
        when: res => res.screenHasUnionBroken === 'No',
        url: RELATIONSHIP_NOT_BROKEN_URL,
        finalPage: true,
      },
    ],
  },
  {
    title: 'When did you get married?',
    subSteps: [
      {
        title: 'You have not been married long enough to apply',
        when: res => parseInt(res.daysElapsed, 10) > 365,
        finalPage: true,
      },
    ],
  },
  {
    title: 'Do you have you marriage certificate with you?',
    url: UNION_CERTIFICATE_URL,
    subSteps: [
      {
        title: 'You need your marriage certificate',
        when: res => res.haveMarriageCertificate === 'No',
        finalPage: true,
      },
    ],
  },
  {
    title: 'Do you need help paying the fee for your divorce?',
    subSteps: [
      {
        title: 'Have you already applied for help with you divorce fee?',
        when: res => res.needHelpPaying === 'Yes',
        subSteps: [
          {
            title: 'You need to apply for help with your divorce fees',
            when: res => res.appliedForHelpPaying === 'No',
            finalPage: true,
          },
        ],
      },
    ],
  },
  {
    title: 'Did you marry your {husband/wife} in the UK?',
    subSteps: [
      {
        title: 'Is your original marriage certificate in English?',
        when: res => res.marriedInUK === 'No',
        subSteps: [
          {
            title: 'Where did you get married?',
            when: res => res.marriageCertInEnglish === 'Yes',
          },
          {
            title: 'Do you have a ‘certified translation’ of your marriage certificate?',
            when: res => res.marriageCertInEnglish === 'No',
            subSteps: [
              {
                title: 'Where did you get married?',
                when: res => res.certifiedTranslation === 'Yes',
              },
              {
                title: 'You need to get a ‘certified translation’ of your marriage certificate',
                when: res => res.certifiedTranslation === 'No',
                finalPage: true,
              },
            ],
          },
        ],
      },
    ],
  },
  { title: 'Check if you can get a divorce in England or Wales' },
  { title: 'Is your life mainly based in England or Wales?' },
  { title: 'You can use the English or Welsh courts to get a divorce' },
  { title: 'Your names' },
  { title: 'Your names on your marriage certificate' },
  {
    title: 'Did you change your name when you got married?',
    subSteps: [{ title: 'prove', when: res => res.changeName === 'Yes' }],
  },
  {
    title: 'Have you changed your name since getting married?',
    subSteps: [{ title: 'prove', when: res => res.changeName === 'Yes' }],
  },
  { title: 'Enter you {husband/wife’s} email address' },
  {
    title: 'Do you have you {husband’s / wife’s} address?',
    subSteps: [{ title: 'enter address', when: res => res.haveAddress === 'Yes' }],
  },
  { title: 'Other court case relating you marriage, property or children' },
];

const validSteps = sequence.filter(step => step.id && step.url) as Step[];

export const getSteps = (steps: Step[] = [], start = validSteps): Step[] => {
  start.map(step => {
    steps.push(step);
    if (step.subSteps) {
      getSteps(steps, step.subSteps);
    }
  });
  return steps;
};

export const getNextStepUrl = (req: Request, response: Record<string, string>): string => {
  const [path, searchParams] = req.originalUrl.split('?');
  const queryString = searchParams ? `?${searchParams}` : '';

  const currentStep = validSteps.find(step => step.url === path);
  if (!currentStep) {
    return `${path}${queryString}`;
  }
  if (currentStep.subSteps?.length) {
    const foundMatchingSubstep = currentStep.subSteps.find(subStep => subStep.when(response));
    if (foundMatchingSubstep?.url) {
      return `${foundMatchingSubstep?.url}${queryString}`;
    }
  }
  const index = validSteps.indexOf(currentStep);
  return `${validSteps[index + 1]?.url || path}${queryString}`;
};
