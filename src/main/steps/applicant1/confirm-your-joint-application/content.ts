import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { getAnswerRows } from '../../../app/case/answers/getAnswerRows';
import { Checkbox } from '../../../app/case/case';
import { ChangedNameHow, YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { Sections } from '../../applicant1Sequence';
import { moreDetailsComponent } from '../../applicant2/check-your-joint-application/content';
import { CommonContent } from '../../common/common.content';
import * as urls from '../../urls';
import { jurisdictionMoreDetailsContent } from '../connection-summary/content';

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
    [urls.HAS_RELATIONSHIP_BROKEN_URL]: {
      applicant1ScreenHasUnionBroken: 'Has your marriage irretrievably broken down?',
    },
    [urls.DETAILS_OTHER_PROCEEDINGS]: {
      applicant1LegalProceedingsDetails: 'Details of court cases',
    },
    [urls.HELP_WITH_YOUR_FEE_URL]: {
      applicant1HelpPayingNeeded: 'Is help with fees being claimed on this application?',
    },
    [urls.APPLY_FINANCIAL_ORDER]: {
      applyForFinancialOrder: 'Applicant 1<br><br> Do you want to apply for a financial order?',
    },
    [urls.WHERE_YOUR_LIVES_ARE_BASED_URL]: {
      applicant1LifeBasedInEnglandAndWales: "Is applicant 1's life mainly based in England or Wales?",
      applicant2LifeBasedInEnglandAndWales: "Is applicant 2's life mainly based in England or Wales?",
    },
    [urls.JURISDICTION_INTERSTITIAL_URL]: { connections: 'How you’re connected to England and Wales' },
    [urls.APPLICANT_2 + urls.YOUR_NAME]: {
      applicant2FirstNames: 'First name',
      applicant2MiddleNames: 'Middle name',
      applicant2LastNames: 'Last name',
    },
    [urls.APPLICANT_2 + urls.APPLY_FINANCIAL_ORDER]: {
      applicant2ApplyForFinancialOrder: 'Applicant 2<br><br> Do you want to apply for a financial order?',
    },
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
    [urls.OTHER_COURT_CASES]: {
      applicant1LegalProceedings:
        formState?.applicant1LegalProceedings === YesOrNo.YES || formState?.applicant2LegalProceedings === YesOrNo.YES
          ? 'Yes'
          : 'No',
    },
    [urls.DETAILS_OTHER_PROCEEDINGS]: {
      applicant1LegalProceedingsDetails:
        formState?.applicant1LegalProceedingsDetails && formState?.applicant2LegalProceedingsDetails
          ? formState?.applicant1LegalProceedingsDetails + '\n\n' + formState?.applicant2LegalProceedingsDetails
          : formState?.applicant1LegalProceedingsDetails
          ? formState?.applicant1LegalProceedingsDetails
          : formState?.applicant2LegalProceedingsDetails,
    },
    [urls.APPLY_FINANCIAL_ORDER]: {
      applyForFinancialOrder: formState?.applyForFinancialOrder === YesOrNo.YES ? ' \n\n Yes' : ' \n\n No',
    },
    // [urls.HELP_WITH_YOUR_FEE_URL]: {
    //   applicant1HelpPayingNeeded:
    //   formState?.applicant1HelpPayingNeeded === YesOrNo.YES && formState.applicant2HelpPayingNeeded === YesOrNo.YES ? 'Yes'
    //   : formState?.applicant1HelpPayingNeeded === YesOrNo.YES || formState?.applicant2HelpPayingNeeded === YesOrNo.YES ? 'No'
    //   : `No, because both applicants	did not apply`,
    // },
    [urls.HELP_PAYING_HAVE_YOU_APPLIED]: {
      applicant1AlreadyAppliedForHelpPaying:
        formState?.applicant1HelpPayingNeeded === YesOrNo.YES &&
        formState?.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes
          ${formState?.applicant1HelpWithFeesRefNo}`
          : false,
    },
    [urls.JURISDICTION_INTERSTITIAL_URL]: { connections: stepContent => stepContent.line1 },
    [urls.HOW_DID_YOU_CHANGE_YOUR_NAME]: {
      applicant1NameChangedHow: formState?.applicant1NameChangedHow
        ?.join(' / ')
        .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
        .replace(ChangedNameHow.MARRIAGE_CERTIFICATE, 'Marriage certificate')
        .replace(ChangedNameHow.OTHER, 'Another way'),
    },
    [urls.APPLICANT_2 + urls.APPLY_FINANCIAL_ORDER]: {
      applicant2ApplyForFinancialOrder:
        formState?.applicant2ApplyForFinancialOrder === YesOrNo.YES ? ' \n\n Yes' : ' \n\n No',
    },
    [urls.APPLICANT_2 + urls.HELP_PAYING_HAVE_YOU_APPLIED]: {
      applicant2AlreadyAppliedForHelpPaying:
        formState?.applicant1HelpPayingNeeded === YesOrNo.YES &&
        formState?.applicant1AlreadyAppliedForHelpPaying === YesOrNo.YES
          ? `Yes
            ${formState?.applicant1HelpWithFeesRefNo}`
          : false,
    },
    [urls.APPLICANT_2 + urls.HOW_DID_YOU_CHANGE_YOUR_NAME]: {
      applicant2NameChangedHow: formState?.applicant2NameChangedHow
        ?.join(' / ')
        .replace(ChangedNameHow.DEED_POLL, 'Deed poll')
        .replace(ChangedNameHow.MARRIAGE_CERTIFICATE, 'Marriage certificate')
        .replace(ChangedNameHow.OTHER, 'Another way'),
    },
  },
  stepAnswersWithHTML: {
    [urls.JURISDICTION_INTERSTITIAL_URL]: {
      connections: moreDetailsComponent(
        jurisdictionMoreDetailsContent(formState).connectedToEnglandWales,
        jurisdictionMoreDetailsContent(formState).readMore
      ),
    },
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
    applicant1IConfirmPrayer: {
      required:
        'You have not confirmed what you are applying to the court to do. You need to confirm before continuing.',
    },
    applicant1IBelieveApplicationIsTrue: {
      required:
        'You have not confirmed that you believe the facts in the application are true. You need to confirm before continuing.',
    },
  },
});

// @TODO translations
const cy: typeof en = en;

export const form: FormContent = {
  fields: {
    applicant1IConfirmPrayer: {
      type: 'checkboxes',
      label: l => l.confirm,
      labelSize: 'm',
      values: [
        {
          name: 'applicant1IConfirmPrayer',
          label: l => l.confirmPrayer,
          hint: l => l.confirmPrayerHint,
          value: Checkbox.Checked,
          validator: isFieldFilledIn,
        },
      ],
    },
    applicant1IBelieveApplicationIsTrue: {
      type: 'checkboxes',
      labelHidden: true,
      values: [
        {
          name: 'applicant1IBelieveApplicationIsTrue',
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
