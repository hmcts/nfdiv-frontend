import { YesOrNo } from '../../../app/case/case';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { commonContent } from '../../common/common.content';

export const generateContent: TranslationFn = ({ isDivorce }) => {
  const en = {
    title: `Is your original ${isDivorce ? 'marriage' : 'civil partnership'} certificate in English?`,
    line1: 'If your original certificate contains an English version, select ‘yes’.',
    line2: 'If you have an English translation as a separate document, select ‘no’.',
    errors: {
      certificateInEnglish: {
        required: commonContent.en.required,
      },
    },
  };

  const cy: typeof en = {
    ...en,
  };

  const common = {
    form,
  };

  return { en, cy, common };
};

export const form: FormContent = {
  fields: {
    certificateInEnglish: {
      type: 'radios',
      classes: 'govuk-radios--inline',
      label: l => l.title,
      values: [
        { label: l => l.yes, value: YesOrNo.Yes },
        { label: l => l.no, value: YesOrNo.No },
      ],
      validator: value => isFieldFilledIn(value),
    },
  },
  submit: {
    text: l => l.continue,
  },
};
