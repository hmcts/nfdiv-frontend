import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Do you think your ${partner} is still in the UK or is receiving UK benefits?`,
  errors: {
    applicant1NoResponsePartnerInUkOrReceivingBenefits: {
      required: 'You must select an option before continuing.',
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: `Ydych chi'n meddwl bod eich ${partner} dal yn y DU neu'n derbyn budd-daliadau'r DU?`,
  errors: {
    applicant1NoResponsePartnerInUkOrReceivingBenefits: {
      required: 'Rhaid i chi ddewis opsiwn cyn parhau.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1NoResponsePartnerInUkOrReceivingBenefits: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.useHelpWithFees,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yes',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'no',
          value: YesOrNo.NO,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
