import { TranslationFn } from '../../../app/controller/GetController';
import { Sections } from '../../../steps/sequence';
import * as urls from '../../urls';

export const generateContent: TranslationFn = ({ isDivorce, partner, formState }) => {
  const en = {
    title: 'Check your answers so far',
    sectionTitles: {
      [Sections.AboutPartnership]: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
      [Sections.ConnectionsToEnglandWales]: 'Your connections to England and Wales',
      [Sections.AboutPartners]: `About you and your ${isDivorce ? 'husband or wife' : 'civil partner'}`,
      [Sections.AboutDissolution]: `About your ${isDivorce ? 'divorce' : 'dissolution'}`,
      [Sections.Documents]: 'Documents',
      [Sections.Payment]: 'Payment',
    },
    stepQuestions: {
      [urls.YOUR_DETAILS_URL]: `${isDivorce ? 'Who are you divorcing' : 'Are you male or female'}?`,
      [`${urls.YOUR_DETAILS_URL}-sameSex`]: 'Type of relationship',
      [urls.RELATIONSHIP_DATE_URL]: `Date ${isDivorce ? 'of marriage' : 'on civil partnership certificate'}`,
      [urls.HELP_PAYING_HAVE_YOU_APPLIED]: 'Help With Fees number',
    },
    stepAnswers: {
      [urls.YOUR_DETAILS_URL]: `${isDivorce ? `My ${partner}` : formState.gender}`,
      [urls.RELATIONSHIP_DATE_URL]: `${formState.relationshipDate?.day}/${formState.relationshipDate?.month}/${formState.relationshipDate?.year}`,
      [urls.HELP_PAYING_HAVE_YOU_APPLIED]: formState.helpWithFeesRefNo,
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
