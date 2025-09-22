import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Are there any children of the family?',
  line1: `This includes any children of you and your ${partner}, and any stepchildren or other children considered as part of the family.`,
  line2: 'This does not include foster children.',
  errors: {
    applicant1DispenseChildrenOfFamily: {
      required: 'Select yes if there are any children of the family',
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: 'Are there any children of the family?',
  line1: `This includes any children of you and your ${partner}, and any stepchildren or other children considered as part of the family.`,
  line2: 'This does not include foster children.',
  errors: {
    applicant1DispenseChildrenOfFamily: {
      required: 'Select yes if there are any children of the family',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1DispenseChildrenOfFamily: {
      type: 'radios',
      classes: 'govuk-radios govuk-radios--inline',
      label: l => l.title,
      labelHidden: true,
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
