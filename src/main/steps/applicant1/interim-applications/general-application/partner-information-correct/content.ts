import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { formatApplicant2Address } from '../../no-response/have-they-received/content';

const en = ({ partner }: CommonContent) => ({
  title: `We need up to date information for your ${partner}`,
  line1: `We need up to date contact details so that we can send the application to your ${partner}.`,

  homeAddress: 'Home address',
  emailAddress: 'Email address',

  questionLabel: `Are these details for your ${partner} correct and up to date?`,
  errors: {
    applicant1GenAppPartnerDetailsCorrect: {
      required: 'Select yes if these address details are up to date.',
    },
  },
});

// @TODO translations
const cy = ({ partner }: CommonContent) => ({
  title: `We need up to date information for your ${partner}`,
  line1: `We need up to date contact details so that we can send the application to your ${partner}.`,

  homeAddress: 'Home address',
  emailAddress: 'Email address',

  questionLabel: `Are these details for your ${partner} correct and up to date?`,
  errors: {
    applicant1GenAppPartnerDetailsCorrect: {
      required: 'Select yes if these address details are up to date.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicant1GenAppPartnerDetailsCorrect: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.questionLabel,
      labelHidden: false,
      values: [
        {
          label: l => l.yes,
          id: 'yesDetailsCorrect',
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          id: 'noDetailsNotCorrect',
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
  const applicant2Address =
    content.userCase.applicant2AddressPrivate === YesOrNo.YES ? 'N/A' : formatApplicant2Address(content.userCase);
  const applicant2Email =
    content.userCase.applicant2AddressPrivate === YesOrNo.YES ? 'N/A' : content.userCase.applicant2Email;
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
    applicant2Address,
    applicant2Email,
  };
};
