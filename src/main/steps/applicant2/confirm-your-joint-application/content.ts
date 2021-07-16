import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { getCompleteAnswerRows } from '../../../app/case/answers/getCompleteAnswerRows';
import { Checkbox } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { Sections } from '../../applicant1Sequence';
import { CommonContent } from '../../common/common.content';
import * as urls from '../../urls';

const en = ({ isDivorce, partner, formState }: CommonContent) => ({
  title: 'Confirm your joint application',
  subHeader: `This is the information you and your ${partner} have provided for your joint application. Confirm it before continuing.`,
  sectionTitles: {
    [Sections.AboutApplicant1]: 'About applicant 1',
    [Sections.AboutApplicant2]: 'About applicant 2',
    [Sections.AboutPartnership]: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
    [Sections.HelpWithFees]: 'Help with fees',
    [Sections.ConnectionsToEnglandWales]: 'Your connections to England and Wales',
    [Sections.OtherCourtCases]: 'Other court cases',
    [Sections.DividingAssets]: 'Dividing your money and property',
  },
  stepQuestions: {
    [urls.YOUR_NAME]: {
      applicant1FirstNames: 'First name',
      applicant1MiddleNames: 'Middle name',
      applicant1LastNames: 'Last name',
    },
    ['/applicant2' + urls.YOUR_NAME]: {
      applicant2FirstNames: 'First name',
      applicant2MiddleNames: 'Middle name',
      applicant2LastNames: 'Last name',
    },
    [urls.HAS_RELATIONSHIP_BROKEN_URL]: {
      applicant1ScreenHasUnionBroken: 'Has your marriage irretrievably broken down?',
    },
    [urls.HELP_WITH_YOUR_FEE_URL]: {
      applicant1HelpPayingNeeded: 'Is help with fees being claimed on this application?',
    },
    [urls.APPLY_FINANCIAL_ORDER]: {
      applyForFinancialOrder: 'Applicant 1<br><br> Do you want to apply for a financial order?',
    },
    ['/applicant2' + urls.APPLY_FINANCIAL_ORDER]: {
      applicant2ApplyForFinancialOrder: 'Applicant 2<br><br> Do you want to apply for a financial order?',
    },
    [urls.WHERE_YOUR_LIVES_ARE_BASED_URL]: {
      applicant1LifeBasedInEnglandAndWales: "Is applicant 1's life mainly based in England or Wales?",
      applicant2LifeBasedInEnglandAndWales: "Is applicant 2's life mainly based in England or Wales?",
    },
    [urls.JURISDICTION_INTERSTITIAL_URL]: { connections: 'How you’re connected to England and Wales' },
  },
  stepAnswers: {
    [urls.RELATIONSHIP_DATE_URL]: {
      relationshipDate: formState?.relationshipDate ? getFormattedDate(formState?.relationshipDate) : false,
    },
    [urls.HOW_DO_YOU_WANT_TO_APPLY]: {
      applicationType: 'We want to apply jointly',
    },
    [urls.HAS_RELATIONSHIP_BROKEN_URL]: {
      screenHasUnionBroken: 'Yes, the marriage has irretrievably broken down ',
    },
    [urls.CERTIFIED_TRANSLATION]: {
      certifiedTranslation: formState?.certifiedTranslation === YesOrNo.YES ? 'Yes' : 'No',
    },
    [urls.APPLY_FINANCIAL_ORDER]: {
      applyForFinancialOrder: formState?.applyForFinancialOrder === YesOrNo.YES ? ' \n\n Yes' : ' \n\n No',
    },
    ['/applicant2' + urls.APPLY_FINANCIAL_ORDER]: {
      applicant2ApplyForFinancialOrder:
        formState?.applicant2ApplyForFinancialOrder === YesOrNo.YES ? ' \n\n Yes' : ' \n\n No',
    },
    [urls.HELP_PAYING_HAVE_YOU_APPLIED]: {
      applicant1AlreadyAppliedForHelpPaying:
        formState?.applicant1HelpPayingNeeded === YesOrNo.YES &&
        formState?.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes
          ${formState?.applicant1HelpWithFeesRefNo}`
          : false,
    },
    ['/applicant2' + urls.HELP_PAYING_HAVE_YOU_APPLIED]: {
      applicant2AlreadyAppliedForHelpPaying:
        formState?.applicant1HelpPayingNeeded === YesOrNo.YES &&
        formState?.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes
            ${formState?.applicant1HelpWithFeesRefNo}`
          : false,
    },
    [urls.JURISDICTION_INTERSTITIAL_URL]: { connections: stepContent => stepContent.line1 },
    [urls.HOW_DID_YOU_CHANGE_YOUR_NAME]: {
      applicant1ChangedNameHow:
        formState?.applicant1ChangedNameHow === 'marriageCertificate'
          ? 'Marriage Certificate'
          : formState?.applicant1ChangedNameHow === 'deedPoll'
          ? 'Deed poll'
          : 'Another way',
    },
    // ['/applicant2' + urls.HOW_DID_YOU_CHANGE_YOUR_NAME]: {
    //   applicant1ChangedNameHow:
    //   formState?.applicant1ChangedNameHow === 'marriageCertificate' ? 'Marriage Certificate'
    //   : formState?.applicant1ChangedNameHow === 'deedPoll' ? 'Deed poll' : 'Another way',
    // },
  },
  confirm: 'Confirm before continuing',
  confirmPrayer: `I confirm that I’m applying to the court to the court with my ${partner} to:`,
  confirmPrayerHint: `<ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>${isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'}
    <li>decide how our money and property will be split (known as a financial order)</li>
  </ul>
  <p class="govuk-body govuk-!-margin-bottom-0">This confirms what you are asking the court to do. It’s known as ‘the prayer’.</p>`,
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.</p>',
  confirmApplicationIsTrueWarning: 'You could be fined or imprisoned if you deliberately submit false information. ',
  continue: 'Continue',
  errors: {
    iConfirmPrayer: {
      required:
        'You have not confirmed what you are applying to the court to do. You need to confirm before continuing.',
    },
    iBelieveApplicationIsTrue: {
      required:
        'You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

// TODO - Create applicant2IConfirmPrayer and applicant2IBelieveApplicationIsTrue fields
export const form: FormContent = {
  fields: {
    iConfirmPrayer: {
      type: 'checkboxes',
      label: l => l.confirm,
      labelSize: 'm',
      values: [
        {
          name: 'iConfirmPrayer',
          label: l => l.confirmPrayer,
          hint: l => l.confirmPrayerHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
    iBelieveApplicationIsTrue: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'iBelieveApplicationIsTrue',
          label: l => l.confirmApplicationIsTrue,
          hint: l => l.confirmApplicationIsTrueHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);
  return {
    ...translations,
    sections: Sections,
    getCompleteAnswerRows,

    form,
  };
};
