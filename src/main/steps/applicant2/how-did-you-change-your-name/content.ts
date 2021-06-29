import { ChangedNameHow } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/how-did-you-change-your-name/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2ChangedNameHow: {
        required,
      },
      applicant2ChangedNameHowAnotherWay: {
        required:
          'You have said you changed your name another way but not provided details. Provide details of how you changed your name.',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2ChangedNameHow: {
      type: 'checkboxes',
      label: l => l.title,
      labelHidden: true,
      values: [
        {
          name: 'applicant2ChangedNameHow',
          label: l => l.sendingOffMarriageCertificate,
          value: ChangedNameHow.MARRIAGE_CERTIFICATE,
        },
        {
          name: 'applicant2ChangedNameHow',
          label: l => l.deedPoll,
          value: ChangedNameHow.DEED_POLL,
          conditionalText: l => `<p class="govuk-label">${l.deedPollMoreDetails}</p>`,
        },
        {
          name: 'applicant2ChangedNameHow',
          label: l => l.anotherWay,
          value: ChangedNameHow.OTHER,
          subFields: {
            applicant2ChangedNameHowAnotherWay: {
              type: 'textarea',
              label: l => l.anotherWayMoreDetails,
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
