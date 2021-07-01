import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/check-your-answers/content';
import { CommonContent } from '../../common/common.content';
import * as urls from '../../urls';

const moreDetailsComponent = (text: string, title?: string) => {
  return `
  <details class="govuk-details summary" data-module="govuk-details">
    <summary class="govuk-details__summary">
      <span class="govuk-details__summary-text">
        Find out more ${title || ''}
      </span>
    </summary>
    <div class="govuk-details__text">
      ${text}
    </div>
  </details>`;
};

const labels = ({ isDivorce, partner, required, formState }: CommonContent) => {
  const moreDetailsContent = {
    helpWithFees: `This ${
      isDivorce ? 'divorce application' : 'application to end your civil partnership'
    } costs £550. You will not be asked to pay the fee. Your ${partner} will be asked to pay. ${
      formState?.applicant1HelpPayingNeeded === YesOrNo.YES
        ? 'They have said that they need help paying the fee. They can only use help with the fees if you apply too. That is why you were asked whether you needed help paying the fee.'
        : ''
    }`,
    connectedToEnglandWales:
      "If your life is mainly based in England or Wales then you're what is legally known as 'habitually resident'. This may include working, owning property, having children in school, or your main family life taking place in England or Wales.<br>The examples above aren't a complete list of what makes up habitual residence, and just because some of them apply to you doesn't mean you're habitually resident. If you're not sure, you should get legal advice.",
    otherCourtCases:
      'The court only needs to know about court proceedings relating to your marriage, property or children. It does not need to know about other court proceedings.',
  };

  return {
    title: `Check your ${partner}'s answers`,
    line1: `This is the information your ${partner} provided for your joint application. Check it to make sure it’s correct.`,
    detailsCorrect: `Is the information your ${partner} provided correct?`,
    detailsCorrectHint: 'If you select no then your husband will be notified and asked to change it.',
    explainWhyIncorrect: `Explain what is incorrect or needs changing. Your answer will be sent to your ${partner}.`,
    stepAnswersMoreDetails: {
      [urls.HELP_WITH_YOUR_FEE_URL]: {
        applicant1HelpPayingNeeded: moreDetailsComponent(moreDetailsContent.helpWithFees, 'about help with fees'),
      },
      [urls.JURISDICTION_INTERSTITIAL_URL]: {
        connections: moreDetailsComponent(moreDetailsContent.connectedToEnglandWales),
      },
      [urls.OTHER_COURT_CASES]: {
        legalProceedings: moreDetailsComponent(moreDetailsContent.otherCourtCases, 'about other court proceedings'),
      },
    },
    errors: {
      applicant2Confirmation: {
        required,
      },
      applicant2Explanation: {
        required,
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2Confirmation: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.detailsCorrect,
      hint: l => l.detailsCorrectHint,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            applicant2Explanation: {
              type: 'textarea',
              label: l => l.explainWhyIncorrect,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const applicant1Content = applicant1GenerateContent(content);
  return {
    ...applicant1Content,
    ...labels(content),
    form,
  };
};
