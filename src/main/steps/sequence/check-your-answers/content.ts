import { startCase } from 'lodash';

import { Case, YesOrNo } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { Sections } from '../../../steps/sequence';
import * as urls from '../../urls';

export const generateContent: TranslationFn = ({ isDivorce, partner }) => {
  const en = {
    title: 'Check your answers',
    soFar: 'so far',
    sectionTitles: {
      [Sections.AboutPartnership]: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
      [Sections.ConnectionsToEnglandWales]: 'Your connections to England and Wales',
      [Sections.AboutPartners]: `About you and your ${isDivorce ? partner : 'civil partner'}`,
      [Sections.ContactYou]: 'How the court will contact you',
      [Sections.ContactThem]: `How the court will contact your ${isDivorce ? partner : 'civil partner'}`,
      [Sections.OtherCourtCases]: 'Other court cases',
      [Sections.DividingAssets]: 'Dividing your money and property',
      [Sections.Costs]: 'Costs',
      [Sections.Documents]: 'Your documents',
      [Sections.Payment]: 'Payment and help with fees',
    },
    stepQuestions: {
      [urls.YOUR_DETAILS_URL]: {
        gender: `${isDivorce ? 'Who are you divorcing' : 'Are you male or female'}?`,
        appliesToYou: 'Type of relationship',
      },
      [urls.RELATIONSHIP_DATE_URL]: `Date ${isDivorce ? 'of marriage' : 'on civil partnership certificate'}`,
      [urls.HELP_PAYING_HAVE_YOU_APPLIED]: 'Help With Fees number',
    },
    stepAnswers: {
      [urls.YOUR_DETAILS_URL]: {
        gender: (formState: Partial<Case>) => (isDivorce ? `My ${partner}` : startCase(formState.gender)),
      },
      [urls.RELATIONSHIP_DATE_URL]: (formState: Partial<Case>) =>
        Object.values(formState.relationshipDate || {})
          .filter(value => !!value)
          .reverse()
          .join('/') || false,
      [urls.HELP_PAYING_HAVE_YOU_APPLIED]: (formState: Partial<Case>) =>
        formState.helpPayingNeeded === YesOrNo.Yes && formState.alreadyAppliedForHelpPaying === YesOrNo.Yes
          ? formState.helpWithFeesRefNo
          : false,
    },
    a11yChange: {
      [urls.HAS_RELATIONSHIP_BROKEN_URL]: `${isDivorce ? 'Marriage' : 'Civil partnership'} irretrievably broken down`,
      [urls.CERTIFICATE_URL]: `${isDivorce ? 'Marriage' : 'Civil partnership'} certificate`,
      [urls.HELP_WITH_YOUR_FEE_URL]: 'Help paying the fee',
    },
    yes: 'Yes',
    no: 'No',
    change: 'Change',
    continueApplication: 'Continue application',
    continuePay: 'Continue to payment',
  };

  // @TODO translations
  const cy: typeof en = { ...en, yes: 'Ydy', no: 'Nac' };

  return {
    en,
    cy,
    common: {
      sections: Sections,
    },
  };
};
