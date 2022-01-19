import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent as applicant1GenerateContent } from '../../applicant1/review-your-joint-application/content';
import { CommonContent } from '../../common/common.content';

const labels = ({ required }: CommonContent) => {
  return {
    errors: {
      applicant2ConfirmInformationStillCorrect: {
        required,
      },
      applicant2ReasonInformationNotCorrect: {
        required: 'You need to say what information is incorrect before continuing.',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    applicant2ConfirmInformationStillCorrect: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.confirmInformationStillCorrect,
      values: [
        { label: l => l.yes, value: YesOrNo.YES },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            applicant2ReasonInformationNotCorrect: {
              type: 'textarea',
              label: l => l.title,
              labelHidden: true,
              hint: l => `
                <p class="govuk-body">
                  ${l.reasonInformationNotCorrect}
                </p>
                ${l.reasonInformationNotCorrectHint}`,
              validator: value => isFieldFilledIn(value),
            },
          },
        },
      ],
      validator: value => isFieldFilledIn(value),
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
