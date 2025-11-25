import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Have you been able to find your ${partner}'s address?`,
  line1: `This can be their home address, or the address of their solicitor if they have one. You can also provide a work address if you have your ${partner}'s permission to do so.`,
  errors: {
    applicant1NoRespAddressFoundAddress: {
      required: `Select yes if you have found your ${partner}'s address.`,
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: `Have you been able to find your ${partner}'s address?`,
  line1: `This can be their home address, or the address of their solicitor if they have one. You can also provide a work address if you have your ${partner}'s permission to do so.`,
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
