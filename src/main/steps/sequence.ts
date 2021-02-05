import {
  HAS_MARRIAGE_BROKEN_URL,
  LANGUAGE_PREFERENCE_URL,
  MARRIAGE_CERTIFICATE_URL,
  MARRIAGE_NOT_BROKEN_URL,
} from './urls';

interface Step {
  title: string;
  field?: string;
  url?: string;
  subSteps?: SubStep[];
}

interface SubStep extends Step {
  when: (response: Record<string, string>) => boolean;
  finalPage?: boolean;
}

export const sequence: Step[] = [
  {
    title: 'What language do you want us to use when we contact you?',
    url: LANGUAGE_PREFERENCE_URL,
  },
  { title: 'Who are you divorcing?' },
  {
    title: 'Has you marriage irretrievably broken down (it cannot be saved)?',
    url: HAS_MARRIAGE_BROKEN_URL,
    subSteps: [
      {
        title: 'You cannot apply to get a divorce',
        field: 'screenHasMarriageBroken',
        when: res => res.screenHasMarriageBroken === 'No',
        url: MARRIAGE_NOT_BROKEN_URL,
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
    url: MARRIAGE_CERTIFICATE_URL,
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

export const getNextStepUrl = (currentUrl: string, response: Record<string, string>): string => {
  const validSteps = sequence.filter(step => step.url);
  const currentStep = validSteps.find(step => step.url === currentUrl);
  if (!currentStep) {
    return '/';
  }
  if (currentStep.subSteps?.length) {
    const foundMatchingSubstep = currentStep.subSteps.find(subStep => subStep.when(response));
    if (foundMatchingSubstep?.url) {
      return foundMatchingSubstep?.url;
    }
  }
  const index = validSteps.indexOf(currentStep);
  return validSteps[index + 1]?.url || validSteps[index]?.url || '/';
};
