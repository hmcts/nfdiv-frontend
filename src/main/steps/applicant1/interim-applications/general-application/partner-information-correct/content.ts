import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { CommonContent } from '../../../../common/common.content';
import { formatApplicant1Address, formatApplicant2Address } from '../../no-response/have-they-received/content';

const en = ({ partner }: CommonContent) => {
  const genAppPartnerDetailsCorrectErrors = {
    required: 'Select yes if these address details are up to date.',
  };

  return {
    title: `We need up to date information for your ${partner}`,
    line1: `We need up to date contact details so that we can send the application to your ${partner}.`,

    homeAddress: 'Home address',
    emailAddress: 'Email address',

    questionLabel: `Are these details for your ${partner} correct and up to date?`,
    errors: {
      applicant1GenAppPartnerDetailsCorrect: genAppPartnerDetailsCorrectErrors,
      applicant2GenAppPartnerDetailsCorrect: genAppPartnerDetailsCorrectErrors,
    },
  };
};

// @TODO translations
const cy = ({ partner }: CommonContent) => {
  const genAppPartnerDetailsCorrectErrors = {
    required: 'Select yes if these address details are up to date.',
  };

  return {
    title: `We need up to date information for your ${partner}`,
    line1: `We need up to date contact details so that we can send the application to your ${partner}.`,

    homeAddress: 'Home address',
    emailAddress: 'Email address',

    questionLabel: `Are these details for your ${partner} correct and up to date?`,
    errors: {
      applicant1GenAppPartnerDetailsCorrect: genAppPartnerDetailsCorrectErrors,
      applicant2GenAppPartnerDetailsCorrect: genAppPartnerDetailsCorrectErrors,
    },
  };
};

const languages = {
  en,
  cy,
};

const genAppPartnerDetailsCorrectField = () => ({
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
});

export const form: FormContent = {
  fields: {
    applicant1GenAppPartnerDetailsCorrect: genAppPartnerDetailsCorrectField(),
  },
  submit: {
    text: l => l.continue,
  },
};

export const applicant2Form: FormContent = {
  ...form,
  fields: {
    applicant2GenAppPartnerDetailsCorrect: genAppPartnerDetailsCorrectField(),
  },
};

export const generateContent: TranslationFn = content => {
  const isApplicant2 = content.isApplicant2;
  const userCase = content.userCase;

  const partnerAddress = isApplicant2 ? formatApplicant1Address(userCase) : formatApplicant2Address(userCase);
  const partnerEmail = isApplicant2 ? userCase.applicant1Email : userCase.applicant2Email;
  const isPartnerConfidential = isApplicant2 ? userCase.applicant1AddressPrivate : userCase.applicant2AddressPrivate;

  const translations = languages[content.language](content);
  return {
    ...translations,
    form: isApplicant2 ? applicant2Form : form,
    partnerAddress: isPartnerConfidential === YesOrNo.YES ? 'N/A' : partnerAddress,
    partnerEmail: isPartnerConfidential === YesOrNo.YES ? 'N/A' : partnerEmail,
  };
};
