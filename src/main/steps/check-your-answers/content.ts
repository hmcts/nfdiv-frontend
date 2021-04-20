import { getFormattedDate } from '../../app/case/answers/formatDate';
import { getAnswerRows } from '../../app/case/answers/getAnswerRows';
import { Case } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { Sections } from '../sequence';
import * as urls from '../urls';

const en = ({ isDivorce, partner }) => ({
  title: 'Check your answers so far',
  sectionTitles: {
    [Sections.AboutPartnership]: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
    [Sections.ConnectionsToEnglandWales]: 'Your connections to England and Wales',
    [Sections.AboutPartners]: `About you and your ${isDivorce ? partner : 'civil partner'}`,
    [Sections.ContactYou]: 'How the court will contact you',
    [Sections.ContactThem]: `How the court will contact your ${isDivorce ? partner : 'civil partner'}`,
    [Sections.OtherCourtCases]: 'Other court cases',
    [Sections.Costs]: 'Costs',
    [Sections.DividingAssets]: 'Dividing your money and property',
    [Sections.Documents]: 'Your documents',
    [Sections.Payment]: 'Payment and help with fees',
  },
  stepAnswers: {
    [urls.RELATIONSHIP_DATE_URL]: (formState: Partial<Case>) => getFormattedDate(formState.relationshipDate),
    [urls.HELP_PAYING_HAVE_YOU_APPLIED]: (formState: Partial<Case>) =>
      formState.helpPayingNeeded === YesOrNo.YES && formState.alreadyAppliedForHelpPaying === YesOrNo.YES
        ? `Yes
             ${formState.helpWithFeesRefNo}`
        : false,
  },
  yes: 'Yes',
  no: 'No',
  continueApplication: 'Continue application',
});

// @TODO translations
const cy: typeof en = ({ isDivorce, partner }) => ({ ...en({ isDivorce, partner }), yes: 'Ydy', no: 'Nac' });

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    sections: Sections,
    getAnswerRows,
  };
};
