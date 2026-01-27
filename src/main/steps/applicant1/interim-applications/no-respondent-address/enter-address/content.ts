import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: 'Enter their postal address',
  errors: {
    applicant1NoRespAddressFoundAddress: {
      required: `Select yes if you have found your ${partner}'s address.`,
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: 'Enter their postal address',
  errors: {
    applicant1NoRespAddressFoundAddress: {
      required: `Select yes if you have found your ${partner}'s address.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoRespAddressHasFoundAddress: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.detailsUpToDateHeader,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
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

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language](content);

  return {
    ...translations,
    form,
  };
};
