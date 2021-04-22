import { getFormattedDate } from '../../app/case/answers/formatDate';
import { getAnswerRows } from '../../app/case/answers/getAnswerRows';
import { Checkbox } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { CommonContent } from '../../steps/common/common.content';
import { Sections } from '../sequence';
import * as urls from '../urls';

const en = ({ isDivorce, partner, formState }: CommonContent) => ({
  titleSoFar: 'Check your answers so far',
  titleSubmit: 'Check your answers',
  sectionTitles: {
    [Sections.AboutPartnership]: `About your ${isDivorce ? 'marriage' : 'civil partnership'}`,
    [Sections.HelpWithFees]: 'Help with fees',
    [Sections.ConnectionsToEnglandWales]: 'Your connections to England and Wales',
    [Sections.AboutPartners]: `About you and your ${isDivorce ? partner : 'civil partner'}`,
    [Sections.ContactYou]: 'How the court will contact you',
    [Sections.ContactThem]: `How the court will contact your ${isDivorce ? partner : 'civil partner'}`,
    [Sections.OtherCourtCases]: 'Other court cases',
    [Sections.Costs]: 'Costs',
    [Sections.DividingAssets]: 'Dividing your money and property',
    [Sections.Documents]: 'Your documents',
  },
  stepQuestions: {
    [urls.JURISDICTION_INTERSTITIAL_URL]: 'How you’re connected to England and Wales',
  },
  stepAnswers: {
    [urls.RELATIONSHIP_DATE_URL]: formState?.relationshipDate ? getFormattedDate(formState?.relationshipDate) : false,
    [urls.HELP_PAYING_HAVE_YOU_APPLIED]:
      formState?.helpPayingNeeded === YesOrNo.YES && formState?.alreadyAppliedForHelpPaying === YesOrNo.YES
        ? `Yes
          ${formState?.helpWithFeesRefNo}`
        : false,
    [urls.JURISDICTION_INTERSTITIAL_URL]: stepContent => stepContent.line1,
  },
  stepLinks: {
    [urls.JURISDICTION_INTERSTITIAL_URL]: urls.CHECK_JURISDICTION,
  },
  continueApplication: 'Continue application',
  confirm: `Confirm before ${formState?.helpWithFeesRefNo ? 'submitting' : 'continuing'}`,
  confirmPrayer: 'I confirm that I’m applying to the court to:',
  confirmPrayerHint: `<ul class="govuk-list govuk-list--bullet govuk-!-margin-top-4">
    <li>${isDivorce ? 'dissolve my marriage (get a divorce)' : 'end my civil partnership'}
    ${
      formState?.applyForFinancialOrder === YesOrNo.YES
        ? '<li>decide how our money and property will be split (known as a financial order)</li>'
        : ''
    }
  </ul>
  <p class="govuk-body govuk-!-margin-bottom-0">This confirms what you are asking the court to do. It’s known as ‘the prayer’.</p>`,
  confirmApplicationIsTrue: 'I believe that the facts stated in this application are true',
  confirmApplicationIsTrueHint:
    '<p class="govuk-body govuk-!-margin-top-4 govuk-!-margin-bottom-0">This confirms that the information you are submitting is true and accurate, to the best of your knowledge. It’s known as your ‘statement of truth’.</p>',
  youCouldBeFined: 'You could be fined or imprisoned if you deliberately submit false information.',
  continue: formState?.helpWithFeesRefNo ? 'Submit application' : 'Continue to payment',
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
    getAnswerRows,
    form,
  };
};
