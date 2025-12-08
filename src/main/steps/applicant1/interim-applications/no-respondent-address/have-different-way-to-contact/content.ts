import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';

const en = ({ partner }: CommonContent) => ({
  title: `Do you have a different way to contact your ${partner}?`,
  line1: `This could include an email address, a phone number or social media. It should be something that your ${partner} actively uses.`,
  errors: {
    applicant1NoRespAddressHasWayToContact: {
      required: `Select yes if you have a different way to contact your ${partner}.`,
    },
  },
});

const cy = ({ partner }: CommonContent) => ({
  title: `Do you have a different way to contact your ${partner}?`,
  line1: `This could include an email address, a phone number or social media. It should be something that your ${partner} actively uses.`,
  errors: {
    applicant1NoRespAddressHasWayToContact: {
      required: `Select yes if you have a different way to contact your ${partner}.`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1NoRespAddressHasWayToContact: {
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
