import { getFormattedDate } from '../../app/case/answers/formatDate';
import { getAnswerRows } from '../../app/case/answers/getAnswerRows';
import { Case, YesOrNo } from '../../app/case/case';
import { TranslationFn } from '../../app/controller/GetController';
import { Sections } from '../sequence';
import * as urls from '../urls';

export const generateContent: TranslationFn = ({ isDivorce, partner }) => {
  const en = {
    title: 'Check your answers so far',
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
    stepAnswers: {
      [urls.RELATIONSHIP_DATE_URL]: (formState: Partial<Case>) => getFormattedDate(formState.relationshipDate),
      [urls.HELP_PAYING_HAVE_YOU_APPLIED]: (formState: Partial<Case>) =>
        formState.helpPayingNeeded === YesOrNo.Yes && formState.alreadyAppliedForHelpPaying === YesOrNo.Yes
          ? `Yes
             ${formState.helpWithFeesRefNo}`
          : false,
    },
    yes: 'Yes',
    no: 'No',
    change: 'Change',
    continueApplication: 'Continue application',
  };

  // @TODO translations
  const cy: typeof en = { ...en, yes: 'Ydy', no: 'Nac' };

  return {
    en,
    cy,
    common: {
      sections: Sections,
      getAnswerRows,
    },
  };
};
