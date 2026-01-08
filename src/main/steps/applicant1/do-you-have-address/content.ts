import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = ({ partner, isDivorce }) => ({
  title: `Your ${partner}'s postal address?`,
  line1: `We need your ${partner}’s address so that we can notify them about ${
    isDivorce ? 'the divorce' : 'ending your civil partnership'
  } by post.`,
  line2: 'It can be a UK or international address.',
  line3: `If you have your ${partner}’s permission, you can use their work address if you do not know their home address.`,
  doYouKnowYourPartnerAddressHeader: `Do you know your ${partner}'s postal address?`,
  haveTheirAddress: 'Yes, I have their address',
  doNotHaveTheirAddress: 'No, I do not have their address',
  errors: {
    applicant1KnowsApplicant2Address: {
      required: `Select yes if you know your ${partner}'s postal address`,
    },
  },
});

//TODO Welsh translation required for NFDIV-4922
const cy: typeof en = ({ partner, isDivorce }) => ({
  title: `Your ${partner}'s postal address`,
  line1: `We need your ${partner}’s address so that we can notify them about ${
    isDivorce ? 'the divorce' : 'ending your civil partnership'
  } by post.`,
  line2: 'It can be a UK or international address.',
  line3: `If you have your ${partner}’s permission, you can use their work address if you do not know their home address.`,
  doYouKnowYourPartnerAddressHeader: `Do you know your ${partner}'s postal address?`,
  haveTheirAddress: 'Yes, I have their address',
  doNotHaveTheirAddress: 'No, I do not have their address',
  errors: {
    applicant1KnowsApplicant2Address: {
      required: `Select yes if you know your ${partner}'s postal address`,
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant1KnowsApplicant2Address: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouKnowYourPartnerAddressHeader,
      values: [
        { label: l => l.haveTheirAddress, value: YesOrNo.YES },
        { label: l => l.doNotHaveTheirAddress, value: YesOrNo.NO },
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
  const { language } = content;
  const translations = languages[language]({ ...content });
  return {
    ...translations,
    form,
  };
};
