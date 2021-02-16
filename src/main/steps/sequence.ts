import {
  HAS_RELATIONSHIP_BROKEN_URL,
  HELP_PAYING_HAVE_YOU_APPLIED,
  HELP_WITH_YOUR_FEE_URL,
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

export interface SubStep extends Step {
  when: (response: Record<string, unknown>) => boolean;
  isFinalPage?: boolean;
}

export const sequence: Step[] = [
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
        isFinalPage: true,
      },
    ],
  },
  {
    id: 'help-paying',
    title: 'Do you need help paying the fee for your divorce?',
    field: 'helpPayingNeeded',
    url: HELP_WITH_YOUR_FEE_URL,
    subSteps: [
      {
        id: 'help-paying-have-ref-no',
        title: 'Have you already applied for help with your divorce fee?',
        field: 'helpWithFeesRefNo',
        when: res => res.helpPayingNeeded === 'Yes',
        url: HELP_PAYING_HAVE_YOU_APPLIED,
      },
    ],
  },
];
