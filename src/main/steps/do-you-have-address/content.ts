import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';

const en = ({ partner, isDivorce, partnerEmailProvided, required }) => ({
  title: `Do you have your ${partner}'s postal address?`,
  line1: `${
    partnerEmailProvided
      ? `The court needs your ${partner}'s address, to notify them about the ${
          isDivorce ? 'divorce' : 'ending your civil partnership'
        }.`
      : `It’s important you provide your ${partner}'s address. You did not provide their email address and the court needs a way to ‘serve’ (deliver) the ${
          isDivorce ? 'divorce' : 'ending your civil partnership'
        } papers to them.`
  }`,
  line2:
    'It can be their home address or their solicitor’s address. It can be UK or international. If you use their work address, you need to ask their permission.',
  line3: `If you do not know their current address then you can use their last-known address. ${
    !partnerEmailProvided
      ? 'If they do not respond at the address you provide, then you will need to make a separate application to serve (deliver) the papers to them another way.'
      : ''
  }`,
  haveTheirAddress: 'Yes, I have their address',
  doNotHaveTheirAddress: 'No, I do not have their address',
  errors: {
    knowPartnersAddress: {
      required,
    },
  },
});

const cy: typeof en = ({ partner, isDivorce, partnerEmailProvided, required }) => ({
  ...en({ partner, isDivorce, partnerEmailProvided, required }),
});

export const form: FormContent = {
  fields: {
    knowPartnersAddress: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.title,
      labelHidden: true,
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
