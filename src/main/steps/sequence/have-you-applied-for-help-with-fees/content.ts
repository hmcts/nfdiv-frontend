import { YesOrNo } from '../../../app/api/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isValidHelpWithFeesRef } from '../../../app/form/validation';
import { commonContent } from '../../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const en = {
    title: `Have you already applied for help with your ${isDivorce ? 'divorce' : ''} fee?`,
    yes: 'Yes',
    enterRefNo: 'Enter your Help with Fees reference number:',
    refReceivedWhenApplied: 'You received this when you applied for help with your fees.',
    refExample: 'For example, HWF-A1B-23C',
    no: 'No',
    errors: {
      alreadyAppliedForHelpPaying: {
        required: commonContent.en.required,
      },
      helpWithFeesRefNo: {
        required:
          'You need to enter your Help With Fees reference number before continuing. You received this when you applied.',
        invalid: 'You have entered an invalid Help With Fees reference number. Check the number and enter it again.',
        invalidUsedExample:
          'You have entered the example Help with Fees number. Enter the number you were sent before continuing.',
      },
    },
  };

  // @TODO translations
  const cy: typeof en = { ...en };

  const common = { form };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {
    alreadyAppliedForHelpPaying: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.Yes,
          subFields: {
            helpWithFeesRefNo: {
              type: 'text',
              attributes: {
                maxLength: 11,
              },
              classes: 'govuk-!-width-one-third',
              label: l => l.enterRefNo,
              hint: l => `
                <p class="govuk-label">${l.refReceivedWhenApplied}</p>
                ${l.refExample}`,
              validator: isValidHelpWithFeesRef,
            },
          },
        },
        { label: l => l.no, value: YesOrNo.No },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};
